/* Reads the text of a .docx file in the browser, with no library.
 * A .docx is a ZIP archive. We find word/document.xml through the ZIP central
 * directory, inflate it with the browser's DecompressionStream, and join the
 * text of each paragraph. Nothing leaves the device.
 */
(function () {
  "use strict";

  function u16(v, o) {
    return v.getUint16(o, true);
  }
  function u32(v, o) {
    return v.getUint32(o, true);
  }

  function findEntry(buf, wanted) {
    var v = new DataView(buf);
    var eocd = -1;
    // The end-of-central-directory record sits in the last 64 KB of the file.
    for (var i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 65557); i--) {
      if (u32(v, i) === 0x06054b50) {
        eocd = i;
        break;
      }
    }
    if (eocd < 0) throw new Error("not-zip");
    var count = u16(v, eocd + 10);
    var p = u32(v, eocd + 16);
    var dec = new TextDecoder("utf-8");
    for (var n = 0; n < count; n++) {
      if (u32(v, p) !== 0x02014b50) throw new Error("bad-directory");
      var method = u16(v, p + 10);
      var csize = u32(v, p + 20);
      var nameLen = u16(v, p + 28);
      var extraLen = u16(v, p + 30);
      var commentLen = u16(v, p + 32);
      var local = u32(v, p + 42);
      var name = dec.decode(new Uint8Array(buf, p + 46, nameLen));
      if (name === wanted) {
        if (u32(v, local) !== 0x04034b50) throw new Error("bad-local");
        var start = local + 30 + u16(v, local + 26) + u16(v, local + 28);
        return { method: method, data: new Uint8Array(buf, start, csize) };
      }
      p += 46 + nameLen + extraLen + commentLen;
    }
    throw new Error("no-document");
  }

  function inflate(bytes) {
    if (typeof DecompressionStream === "undefined") return Promise.reject(new Error("no-inflate"));
    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Response(stream).arrayBuffer();
  }

  function xmlToText(xml) {
    var doc = new DOMParser().parseFromString(xml, "application/xml");
    if (doc.getElementsByTagName("parsererror").length) throw new Error("bad-xml");
    var W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
    var paras = doc.getElementsByTagNameNS(W, "p");
    var lines = [];
    for (var i = 0; i < paras.length; i++) {
      var parts = [];
      var nodes = paras[i].getElementsByTagNameNS(W, "*");
      for (var j = 0; j < nodes.length; j++) {
        var ln = nodes[j].localName;
        if (ln === "t") parts.push(nodes[j].textContent);
        else if (ln === "tab") parts.push(" ");
        else if (ln === "br") parts.push("\n");
      }
      lines.push(parts.join(""));
    }
    return lines.join("\n");
  }

  function readDocx(buf) {
    var entry;
    try {
      entry = findEntry(buf, "word/document.xml");
    } catch (e) {
      return Promise.reject(e);
    }
    var raw =
      entry.method === 0
        ? Promise.resolve(entry.data.slice().buffer)
        : entry.method === 8
          ? inflate(entry.data)
          : Promise.reject(new Error("bad-method"));
    return raw.then(function (ab) {
      return xmlToText(new TextDecoder("utf-8").decode(ab));
    });
  }

  window.LexLensDocx = { readDocx: readDocx };
})();
