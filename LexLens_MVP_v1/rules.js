/* LexLens v1 rule base.
 * Each rule is a pattern that finds a risky clause, plus the norm it rests on.
 * Norm quotes are copied from the official texts on Adilet (adilet.zan.kz),
 * checked on 19 November 2026. Where an official Kazakh quote is not yet
 * verified, `kk` is null and the app shows the Russian official text.
 * Severity "high" means likely unlawful or void. Severity "medium" means risky, needs review.
 */
(function () {
  "use strict";

  var CC = { ru: "https://adilet.zan.kz/rus/docs/K940001000_", kk: "https://adilet.zan.kz/kaz/docs/K940001000_" };
  var LC = { ru: "https://adilet.zan.kz/rus/docs/K1500000414", kk: "https://adilet.zan.kz/kaz/docs/K1500000414" };

  var NORMS = {
    cc282: {
      act: "cc",
      article: "282",
      para: "1",
      url: CC,
      ru: "Денежные обязательства на территории Республики Казахстан должны быть выражены в теңге (статья 127 настоящего Кодекса), за исключением случаев, предусмотренных законами Республики Казахстан. Использование иностранной валюты, а также платежных документов в иностранной валюте при осуществлении расчетов по обязательствам на территории Республики Казахстан допускается в случаях и на условиях, определенных законами Республики Казахстан или в установленном ими порядке.",
      kk: "Қазақстан Республикасының заңдарында көзделген жағдайларды қоспағанда, Қазақстан Республикасының аумағында ақшалай міндеттемелер теңгемен (осы Кодекстің 127-бабы) көрсетіледі.",
    },
    cc297: {
      act: "cc",
      article: "297",
      para: null,
      url: CC,
      ru: "Если подлежащая уплате неустойка (штраф, пеня) чрезмерно велика по сравнению с убытками кредитора, суд по требованию должника вправе уменьшить неустойку (штраф, пеню), учитывая степень выполнения обязательства должником и заслуживающие внимания интересы должника и кредитора.",
      kk: "Егер төленуге тиісті тұрақсыздық айыбы (айыппұл, өсімпұл) кредитордың шеккен залалдарымен салыстырғанда тым көп болса, сот борышкердің талабы бойынша борышкердің міндеттемені орындау дәрежесін және борышкер мен кредитордың назар аударуға лайықты мүдделерін ескере отырып, тұрақсыздық айыбын (айыппұлды, өсімпұлды) азайтуға құқылы.",
    },
    cc273: {
      act: "cc",
      article: "273",
      para: null,
      url: CC,
      ru: "Односторонний отказ от исполнения обязательства и одностороннее изменение его условий не допускаются, за исключением случаев, предусмотренных законодательством или договором.",
      kk: "Заңдарда немесе шартта көзделгеннен басқа реттерде міндеттемені орындаудан біржақты бас тартуға және оның шарттарын біржақты өзгертуге жол берілмейді.",
    },
    cc177: {
      act: "cc",
      article: "177",
      para: "2",
      url: CC,
      ru: "Сроки исковой давности и порядок их исчисления предусматриваются законом и не могут быть изменены соглашением сторон.",
      kk: "Талап қою мерзімдері және оларды есептеу тәртібі заңмен көзделеді және оларды тараптардың келісуімен өзгертуге болмайды.",
    },
    cc359_3: {
      act: "cc",
      article: "359",
      para: "3",
      url: CC,
      ru: "Заключенное заранее соглашение об устранении или ограничении ответственности за умышленное нарушение обязательства ничтожно.",
      kk: "Міндеттемені әдейі бұзғаны үшін жауапкершілікті жою немесе шектеу туралы алдын ала жасалған шарт маңызсыз болады.",
    },
    cc359_2: {
      act: "cc",
      article: "359",
      para: "2",
      url: CC,
      ru: "Лицо, не исполнившее или ненадлежащим образом исполнившее обязательство при осуществлении предпринимательской деятельности, несет имущественную ответственность, если не докажет, что надлежащее исполнение оказалось невозможным вследствие непреодолимой силы, то есть чрезвычайных и непредотвратимых при данных условиях обстоятельствах (стихийные явления, военные действия, чрезвычайное положение и т.п.). К таким обстоятельствам не относится, в частности, отсутствие на рынке нужных для исполнения товаров, работ или услуг. Законодательством или договором могут быть предусмотрены иные основания ответственности или освобождения от нее.",
      kk: "Кәсіпкерлік қызметті жүзеге асырған кезде міндеттемені орындамаған немесе тиісті дәрежеде орындамаған адам, егер бой бермейтін күштің, яғни осы жағдайлар кезіндегі төтенше және тойтаруға болмайтын мән-жайлардың (дүлей құбылыстар, соғыс қимылдары, төтенше жағдай және т.б.) салдарынан тиісті дәрежеде орындауға мүмкіндік болмағандығын дәлелдей алмаса, мүліктік жауаптылықты көтереді. Ондай мән-жайларға, атап айтқанда, міндеттемені орындау үшін қажетті тауарлардың, жұмыстардың немесе қызмет көрсетудің рынокта болмауы жатпайды. Заңдарда немесе шартта жауапкершіліктің және одан босатылудың өзге негіздері ескерілуі мүмкін.",
    },
    lc36: {
      act: "lc",
      article: "36",
      para: "2",
      url: LC,
      ru: "Испытательный срок включается в трудовой стаж работника и не может превышать три месяца. Для руководителей организаций и их заместителей, главных бухгалтеров и их заместителей, руководителей филиалов, представительств организаций испытательный срок может быть увеличен до шести месяцев.",
      kk: null,
    },
    lc68: {
      act: "lc",
      article: "68",
      para: "1",
      url: LC,
      ru: "Нормальная продолжительность рабочего времени не должна превышать 40 часов в неделю.",
      kk: null,
    },
    lc88: {
      act: "lc",
      article: "88",
      para: null,
      url: LC,
      ru: "Основной оплачиваемый ежегодный трудовой отпуск работникам предоставляется продолжительностью двадцать четыре календарных дня, если большее количество дней не предусмотрено настоящим Кодексом, иными нормативными правовыми актами Республики Казахстан, трудовым, коллективным договорами и актами работодателя.",
      kk: null,
    },
  };

  // Number words in Russian and Kazakh, for clauses like "шесть месяцев" or "алты ай".
  var NUM_WORDS = {
    один: 1,
    одного: 1,
    одному: 1,
    два: 2,
    двух: 2,
    три: 3,
    трех: 3,
    трёх: 3,
    четыре: 4,
    четырех: 4,
    четырёх: 4,
    пять: 5,
    пяти: 5,
    шесть: 6,
    шести: 6,
    семь: 7,
    семи: 7,
    восемь: 8,
    восьми: 8,
    девять: 9,
    девяти: 9,
    десять: 10,
    десяти: 10,
    одиннадцать: 11,
    двенадцать: 12,
    двенадцати: 12,
    бір: 1,
    екі: 2,
    үш: 3,
    төрт: 4,
    бес: 5,
    алты: 6,
    жеті: 7,
    сегіз: 8,
    тоғыз: 9,
    он: 10,
  };
  var WORD = "[a-zа-яёәіңғүұқөһ]";

  function toNumber(token) {
    if (!token) return null;
    var t = token.toLowerCase().replace(",", ".");
    if (/^\d+(\.\d+)?$/.test(t)) return parseFloat(t);
    return Object.prototype.hasOwnProperty.call(NUM_WORDS, t) ? NUM_WORDS[t] : null;
  }

  // A number written as digits or words, optionally followed by words in brackets, as in "6 (шесть)".
  // The prefix keeps number words from matching inside other words, as "он" would inside "сонымен".
  var NUM =
    "(?:^|[^a-zа-яёәіңғүұқөһ0-9])(\\d+(?:[.,]\\d+)?|" + Object.keys(NUM_WORDS).join("|") + ")(?:\\s*\\([^)]{1,40}\\))?";

  function re(src) {
    return new RegExp(src, "i");
  }

  var RULES = [
    {
      id: "currency",
      severity: "medium",
      norm: "cc282",
      test: function (c) {
        var money = /(оплат|цен[аыуе]|стоимост|сумм|расч[её]т|платеж|платёж|төле|баға|құн[ы ]|сома|есеп айырысу)/i;
        var fx =
          /(АҚШ доллар[а-яәіңғүұқөһ]*|доллар[а-яё]*(?:\s+США)?|usd|\$|евро|eur\b|€|российских рубл[а-яё]*|юан[а-яё]*|cny|иностранн[а-я]* валют[а-яё]*|шетел валюта[а-яәіңғүұқөһ]*)/i;
        if (!money.test(c)) return null;
        var m = c.match(fx);
        return m ? { match: m[0] } : null;
      },
    },
    {
      id: "penalty",
      severity: "medium",
      norm: "cc297",
      test: function (c) {
        if (!/(неустойк|пен[ияюе]|штраф|тұрақсыздық айыб|өсімпұл|айыппұл)/i.test(c)) return null;
        var m = c.match(
          re(
            "(\\d+(?:[.,]\\d+)?)\\s*%[^.;]{0,80}?(за каждый (?:календарный |рабочий )?день|в день|ежедневно|күн сайын|әр күн|әрбір күн)",
          ),
        );
        var rateToken = m ? m[1] : null;
        if (!m) {
          m = c.match(re("(күн сайын|әр күн[іi]?|әрбір күн[іi]?)[^.;]{0,60}?(\\d+(?:[.,]\\d+)?)\\s*%"));
          rateToken = m ? m[2] : null;
        }
        if (!m) return null;
        var rate = toNumber(rateToken);
        if (rate === null || rate < 0.5) return null;
        return { match: m[0], vars: { rate: String(rate).replace(".", ","), annual: Math.round(rate * 365) } };
      },
    },
    {
      id: "unilateral",
      severity: "medium",
      norm: "cc273",
      test: function (c) {
        var m =
          c.match(
            /(в одностороннем порядке|односторонн[а-я]*)[^.;]{0,80}?(измен|расторг|отказ|пересмотр|повыс|увелич)[а-яё]*/i,
          ) ||
          c.match(/(измен|расторг|отказ|пересмотр|повыс|увелич)[а-яё]*[^.;]{0,80}?(в одностороннем порядке)/i) ||
          c.match(/(біржақты(?: тәртіппен)?)[^.;]{0,80}?(өзгерт|бұз|бас тарт|көтер|арттыр)[а-яәіңғүұқөһ]*/i);
        return m ? { match: m[0] } : null;
      },
    },
    {
      id: "limitation",
      severity: "high",
      norm: "cc177",
      test: function (c) {
        var m =
          c.match(/(срок[а-я]* исков[а-я]* давност[а-я]*|исков[а-я]* давност[а-я]*)[^.;]{0,80}/i) ||
          c.match(/(талап қою мерзім[а-яәіңғүұқөһ]*|талаптың ескіру[а-яәіңғүұқөһ]*)[^.;]{0,80}/i);
        if (!m) return null;
        // Only flag when the parties set or change the period themselves.
        if (!/(\d|сокращ|составля|устанавлива|продлева|равен|құрайды|белгілен|қысқарт|ұзарт)/i.test(m[0])) return null;
        return { match: m[0] };
      },
    },
    {
      id: "liability",
      severity: "high",
      norm: "cc359_3",
      test: function (c) {
        var excl = c.match(
          /(не нес[её]т[^.;]{0,30}ответственност[а-я]*|освобожда[а-я]*[^.;]{0,30}от[^.;]{0,10}ответственност[а-я]*|ответственност[а-я]*[^.;]{0,30}(?:исключа|не наступа)[а-я]*|жауапкершілік[^.;]{0,40}(?:көтермейді|жоқ|босат[а-яәіңғүұқөһ]*)|жауаптылық[^.;]{0,40}(?:көтермейді|жоқ))/i,
        );
        if (!excl) return null;
        if (
          !/(умышлен|в любом случае|ни при каких|любые|любых|полностью|әдейі|кез келген жағдайда|ешқандай жағдайда)/i.test(
            c,
          )
        )
          return null;
        return { match: excl[0] };
      },
    },
    {
      id: "forcemajeure",
      severity: "medium",
      norm: "cc359_2",
      test: function (c) {
        if (!/(непреодолим|форс-мажор|форс мажор|бой бермейтін күш|дүлей күш|еңсерілмейтін күш)/i.test(c)) return null;
        var m = c.match(
          /(отсутстви[а-я]*[^.;]{0,40}(на рынке|товар|сырь|материал|комплектующ)[а-я]*|дефицит[а-я]*[^.;]{0,30}|(тауар|шикізат|материал)[а-яәіңғүұқөһ]*[^.;]{0,40}(нарықта|рынокта)?[^.;]{0,10}болмау[ыі]?)/i,
        );
        return m ? { match: m[0] } : null;
      },
    },
    {
      id: "probation",
      severity: "medium",
      norm: "lc36",
      test: function (c) {
        if (!/(испытательн[а-я]* срок|срок[а-я]* испытания|испытани[ея]|сынақ мерзім)/i.test(c)) return null;
        var m = c.match(re(NUM + "\\s*(месяц[а-я]*|ай(?!" + WORD + "))"));
        if (!m) return null;
        var n = toNumber(m[1]);
        if (n === null || n <= 3) return null;
        return { match: m[0], severity: n > 6 ? "high" : "medium", variant: n > 6 ? "over6" : "upto6", vars: { n: n } };
      },
    },
    {
      id: "hours",
      severity: "high",
      norm: "lc68",
      test: function (c) {
        var m =
          c.match(re(NUM + "\\s*час[а-я]*\\s*(в неделю|еженедельно|в течение недели)")) ||
          c.match(re("(?:в неделю|еженедельно)[^.;]{0,20}?" + NUM + "\\s*час")) ||
          c.match(re("аптасына\\s*" + NUM + "\\s*сағат")) ||
          c.match(re(NUM + "\\s*сағат[а-яәіңғүұқөһ]*[^.;]{0,15}апта"));
        if (!m) return null;
        var n = toNumber(m[1]);
        if (n === null || n <= 40 || n > 168) return null;
        return { match: m[0], vars: { n: n } };
      },
    },
    {
      id: "leave",
      severity: "high",
      norm: "lc88",
      test: function (c) {
        if (!/(отпуск|демалыс)/i.test(c)) return null;
        var m = c.match(re(NUM + "\\s*(календарн[а-я]*\\s*дн[а-я]*|күнтізбелік\\s*күн)"));
        if (!m) return null;
        var n = toNumber(m[1]);
        if (n === null || n >= 24) return null;
        return { match: m[0], vars: { n: n } };
      },
    },
  ];

  // Split a contract into clauses: one per line, long lines split at sentence ends.
  function splitClauses(text) {
    var out = [];
    text
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .forEach(function (line) {
        var l = line.replace(/\s+/g, " ").trim();
        if (!l) return;
        if (l.length <= 600) {
          out.push(l);
          return;
        }
        // No lookbehind here: older Safari versions cannot parse it.
        l.replace(/([.;])\s+(?=\d+\.\d|[А-ЯЁӘІҢҒҮҰҚӨҺA-Z])/g, "$1\n")
          .split("\n")
          .forEach(function (s) {
            if (s.trim()) out.push(s.trim());
          });
      });
    return out;
  }

  function detectLanguage(text) {
    var letters = (text.match(/[a-zа-яёәіңғүұқөһ]/gi) || []).length || 1;
    var kk = (text.match(/[әіңғүұқөһ]/gi) || []).length;
    var latin = (text.match(/[a-z]/gi) || []).length;
    if (latin / letters > 0.5) return "other";
    return kk / letters > 0.01 ? "kk" : "ru";
  }

  var ORDER = { high: 0, medium: 1 };

  function check(text) {
    var clauses = splitClauses(text);
    var flags = [];
    clauses.forEach(function (clause, i) {
      RULES.forEach(function (rule) {
        var hit;
        try {
          hit = rule.test(clause);
        } catch (e) {
          hit = null;
        }
        if (!hit) return;
        flags.push({
          rule: rule.id,
          severity: hit.severity || rule.severity,
          variant: hit.variant || null,
          norm: rule.norm,
          clause: clause,
          clauseIndex: i,
          match: hit.match,
          vars: hit.vars || {},
        });
      });
    });
    flags.sort(function (a, b) {
      return ORDER[a.severity] - ORDER[b.severity] || a.clauseIndex - b.clauseIndex;
    });
    return { clauses: clauses.length, flags: flags, language: detectLanguage(text) };
  }

  window.LexLensRules = {
    NORMS: NORMS,
    RULES: RULES,
    check: check,
    splitClauses: splitClauses,
    detectLanguage: detectLanguage,
  };
})();
