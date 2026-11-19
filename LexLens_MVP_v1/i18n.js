/* Interface text in English and Kazakh.
 * Every string the user sees lives here, including errors and rule explanations.
 * The Kazakh text needs a review by a native speaker before release.
 */
(function () {
  "use strict";

  var T = {
    en: {
      htmlLang: "en",
      skip: "Skip to the checker",
      langLabel: "Interface language",
      beta: "Beta",
      tagline: "Check a contract against Kazakhstan law. Every warning quotes the article behind it.",
      step1: "1. Add a contract",
      textLabel: "Contract text (Russian or Kazakh)",
      textPlaceholder: "Paste the contract text here…",
      fileLabel: "Or upload a file: .txt or .docx, up to 2 MB",
      fileButton: "Choose file",
      fileNone: "No file chosen",
      samplesLabel: "No contract at hand? Try a sample:",
      sampleSupply: "Supply contract (RU)",
      sampleEmployment: "Employment contract (KZ)",
      check: "Check contract",
      checking: "Checking…",
      clear: "Clear",
      privacy: "The text is checked in this browser. Nothing is sent to a server or saved.",
      chars: "{n} characters",
      step2: "2. Results",
      contractLang: "Contract language: {lang}",
      langNames: { ru: "Russian", kk: "Kazakh", other: "not recognised" },
      clausesChecked: "{n} clauses checked",
      summary: "{n} issues found: {h} likely unlawful, {m} to review",
      summaryOne: "1 issue found: {h} likely unlawful, {m} to review",
      noneTitle: "No issues found by the 9 rules LexLens checks today",
      noneBody: "This does not mean the contract is safe. A lawyer should still review it.",
      sev: { high: "Likely unlawful", medium: "Review" },
      clause: "Clause",
      why: "Why it matters",
      basis: "Legal basis",
      official: "Official text ({lang})",
      officialLang: { ru: "in Russian", kk: "in Kazakh" },
      kkPending: "The Kazakh official text is on Adilet.",
      openAdilet: "Open on Adilet",
      opensNew: "(opens in a new tab)",
      step3: "3. Save the report",
      download: "Download report",
      reportHint: "An HTML file you can open, print or attach to the case file.",
      coverage: "What LexLens checks in version 1",
      coverageIntro: "Nine rules from the Civil Code and the Labour Code. Clauses outside these rules are not checked.",
      disclaimer: "LexLens is a first-pass check, not legal advice. A lawyer makes the final decision.",
      footer: "LexLens Beta, v1.0. MVP for the Technological Entrepreneurship final exam, Astana IT University.",
      errEmpty: "Add a contract first: paste the text, upload a file or try a sample.",
      errShort: "This text is too short to be a contract. Add at least 150 characters.",
      errType: "This file type is not supported. Use .txt or .docx, or paste the text.",
      errSize: "The file is larger than 2 MB. Paste the text instead.",
      errEmptyFile: "The file is empty.",
      errRead: "We could not read this file. Save it as .docx or .txt and try again, or paste the text.",
      warnLatin:
        "LexLens v1 checks contracts in Russian and Kazakh. This text looks like another language, so results may be empty.",
      fileLoaded: "Loaded: {name}",
      reportTitle: "LexLens contract check report",
      reportGenerated: "Generated",
      acts: {
        cc: "Civil Code of the Republic of Kazakhstan (General Part)",
        lc: "Labour Code of the Republic of Kazakhstan",
      },
      article: "Article {a}",
      paragraph: "paragraph {p}",
      rules: {
        currency: {
          title: "Price or payment in foreign currency",
          why: "In Kazakhstan, monetary obligations must be expressed in tenge. Foreign currency in settlements is allowed only in cases set by law. Check whether an exception applies, for example a non-resident party.",
        },
        penalty: {
          title: "Very high penalty rate",
          why: "A penalty of {rate}% a day is about {annual}% a year. A court may reduce a penalty that is excessively large compared with the creditor's losses, so this clause may not work as written.",
        },
        unilateral: {
          title: "One-sided right to change or refuse",
          why: "One-sided refusal to perform an obligation, or a one-sided change of its terms, is not allowed unless the law or the contract provides for it. This clause gives that right to one party: check that it is limited and fair to your side.",
        },
        limitation: {
          title: "Limitation period changed by agreement",
          why: "Limitation periods and the way they are counted are set by law and cannot be changed by agreement of the parties. This clause is likely void.",
        },
        liability: {
          title: "Liability excluded even for intentional breach",
          why: "An agreement made in advance to exclude or limit liability for intentional breach of an obligation is void. If this clause covers intentional breach, that part does not work.",
        },
        forcemajeure: {
          title: "Market shortage treated as force majeure",
          why: "Under the Civil Code, a lack of the goods, works or services needed to perform is not force majeure. The contract may set other grounds for release, so check that this exemption is intended and acceptable to you.",
        },
        probation: {
          title: "Probation longer than 3 months",
          upto6:
            "Probation may not exceed three months. Up to six months is allowed only for heads of organisations and their deputies, chief accountants and their deputies, and heads of branches and representative offices. Check the employee's position.",
          over6:
            "Probation may not exceed three months, or six months for managers and chief accountants. {n} months exceeds both limits.",
        },
        hours: {
          title: "Working week longer than 40 hours",
          why: "Normal working time must not exceed 40 hours a week. This clause sets {n} hours.",
        },
        leave: {
          title: "Annual leave shorter than 24 calendar days",
          why: "Basic paid annual leave is 24 calendar days, unless a longer period is provided. This clause gives {n} days.",
        },
      },
    },

    kk: {
      htmlLang: "kk",
      skip: "Тексеру құралына өту",
      langLabel: "Интерфейс тілі",
      beta: "Бета",
      tagline: "Шартты Қазақстан заңнамасы бойынша тексеріңіз. Әр ескерту өзіне негіз болған бапты келтіреді.",
      step1: "1. Шартты қосыңыз",
      textLabel: "Шарт мәтіні (орыс немесе қазақ тілінде)",
      textPlaceholder: "Шарт мәтінін осы жерге қойыңыз…",
      fileLabel: "Немесе файл жүктеңіз: .txt не .docx, 2 МБ-қа дейін",
      fileButton: "Файлды таңдау",
      fileNone: "Файл таңдалмаған",
      samplesLabel: "Шарт жоқ па? Үлгіні қолданып көріңіз:",
      sampleSupply: "Жеткізу шарты (RU)",
      sampleEmployment: "Еңбек шарты (KZ)",
      check: "Шартты тексеру",
      checking: "Тексерілуде…",
      clear: "Тазалау",
      privacy: "Мәтін осы браузерде тексеріледі. Ештеңе серверге жіберілмейді және сақталмайды.",
      chars: "{n} таңба",
      step2: "2. Нәтижелер",
      contractLang: "Шарт тілі: {lang}",
      langNames: { ru: "орыс тілі", kk: "қазақ тілі", other: "анықталмады" },
      clausesChecked: "{n} тармақ тексерілді",
      summary: "{n} мәселе табылды: {h} заңға қайшы болуы ықтимал, {m} тексеруді қажет етеді",
      summaryOne: "1 мәселе табылды: {h} заңға қайшы болуы ықтимал, {m} тексеруді қажет етеді",
      noneTitle: "LexLens қазір тексеретін 9 ереже бойынша мәселе табылмады",
      noneBody: "Бұл шарттың қауіпсіз екенін білдірмейді. Оны бәрібір заңгер қарап шығуы керек.",
      sev: { high: "Заңға қайшы болуы ықтимал", medium: "Тексеру қажет" },
      clause: "Тармақ",
      why: "Неліктен маңызды",
      basis: "Құқықтық негіз",
      official: "Ресми мәтін ({lang})",
      officialLang: { ru: "орыс тілінде", kk: "қазақ тілінде" },
      kkPending: "Қазақ тіліндегі ресми мәтін Әділетте берілген.",
      openAdilet: "Әділеттен ашу",
      opensNew: "(жаңа бетте ашылады)",
      step3: "3. Есепті сақтаңыз",
      download: "Есепті жүктеу",
      reportHint: "Ашуға, басып шығаруға немесе іс құжаттарына тіркеуге болатын HTML файл.",
      coverage: "LexLens 1-нұсқасы не тексереді",
      coverageIntro:
        "Азаматтық кодекс пен Еңбек кодексінен алынған тоғыз ереже. Бұл ережелерге кірмейтін тармақтар тексерілмейді.",
      disclaimer: "LexLens – алдын ала тексеру құралы, заң кеңесі емес. Түпкілікті шешімді заңгер қабылдайды.",
      footer:
        "LexLens Бета, 1.0 нұсқа. Astana IT University, «Технологиялық кәсіпкерлік» пәнінің қорытынды емтиханына арналған MVP.",
      errEmpty: "Алдымен шартты қосыңыз: мәтінді қойыңыз, файл жүктеңіз немесе үлгіні таңдаңыз.",
      errShort: "Бұл мәтін шарт болу үшін тым қысқа. Кемінде 150 таңба қосыңыз.",
      errType: "Бұл файл түріне қолдау көрсетілмейді. .txt немесе .docx файлын пайдаланыңыз не мәтінді қойыңыз.",
      errSize: "Файл көлемі 2 МБ-тан асады. Оның орнына мәтінді қойыңыз.",
      errEmptyFile: "Файл бос.",
      errRead:
        "Бұл файлды оқу мүмкін болмады. Оны .docx немесе .txt ретінде сақтап, қайталап көріңіз не мәтінді қойыңыз.",
      warnLatin:
        "LexLens 1-нұсқасы орыс және қазақ тілдеріндегі шарттарды тексереді. Бұл мәтін басқа тілде сияқты, сондықтан нәтиже болмауы мүмкін.",
      fileLoaded: "Жүктелді: {name}",
      reportTitle: "LexLens шартты тексеру есебі",
      reportGenerated: "Жасалған уақыты",
      acts: {
        cc: "Қазақстан Республикасының Азаматтық кодексі (Жалпы бөлім)",
        lc: "Қазақстан Республикасының Еңбек кодексі",
      },
      article: "{a}-бап",
      paragraph: "{p}-тармақ",
      rules: {
        currency: {
          title: "Баға немесе төлем шетел валютасында",
          why: "Қазақстанда ақшалай міндеттемелер теңгемен көрсетіледі. Есеп айырысуда шетел валютасын тек заңда көзделген жағдайларда пайдалануға болады. Ерекшелік қолданылатынын тексеріңіз, мысалы, тараптардың бірі бейрезидент болса.",
        },
        penalty: {
          title: "Тұрақсыздық айыбының мөлшерлемесі тым жоғары",
          why: "Күніне {rate}% айып жылына шамамен {annual}% құрайды. Тұрақсыздық айыбы кредитордың залалдарымен салыстырғанда тым көп болса, сот оны азайтуға құқылы, сондықтан бұл тармақ жазылғандай жұмыс істемеуі мүмкін.",
        },
        unilateral: {
          title: "Біржақты өзгерту немесе бас тарту құқығы",
          why: "Заңда немесе шартта көзделген жағдайлардан басқа, міндеттемені орындаудан біржақты бас тартуға және оның шарттарын біржақты өзгертуге жол берілмейді. Бұл тармақ мұндай құқықты бір тарапқа береді: оның шектеулі және сіздің тарапқа әділ екенін тексеріңіз.",
        },
        limitation: {
          title: "Талап қою мерзімі келісіммен өзгертілген",
          why: "Талап қою мерзімдері және оларды есептеу тәртібі заңмен көзделеді, оларды тараптардың келісуімен өзгертуге болмайды. Бұл тармақ маңызсыз болуы ықтимал.",
        },
        liability: {
          title: "Әдейі бұзғаны үшін де жауапкершілік жойылған",
          why: "Міндеттемені әдейі бұзғаны үшін жауапкершілікті жою немесе шектеу туралы алдын ала жасалған келісім маңызсыз. Егер бұл тармақ әдейі бұзуды да қамтыса, ол бөлігі күшін жоғалтады.",
        },
        forcemajeure: {
          title: "Нарықта тауардың болмауы бой бермейтін күшке жатқызылған",
          why: "Азаматтық кодекс бойынша міндеттемені орындауға қажетті тауарлардың, жұмыстардың немесе қызметтердің нарықта болмауы бой бермейтін күшке жатпайды. Шартта босатудың өзге негіздері көзделуі мүмкін, сондықтан бұл ереже сізге қолайлы екенін тексеріңіз.",
        },
        probation: {
          title: "Сынақ мерзімі 3 айдан ұзақ",
          upto6:
            "Сынақ мерзімі үш айдан аспауы тиіс. Алты айға дейін тек ұйым басшылары мен олардың орынбасарларына, бас бухгалтерлер мен олардың орынбасарларына, филиалдар мен өкілдіктердің басшыларына рұқсат етіледі. Қызметкердің лауазымын тексеріңіз.",
          over6:
            "Сынақ мерзімі үш айдан, ал басшылар мен бас бухгалтерлер үшін алты айдан аспауы тиіс. {n} ай екі шектен де асады.",
        },
        hours: {
          title: "Жұмыс аптасы 40 сағаттан ұзақ",
          why: "Жұмыс уақытының қалыпты ұзақтығы аптасына 40 сағаттан аспауы тиіс. Бұл тармақта {n} сағат белгіленген.",
        },
        leave: {
          title: "Жыл сайынғы демалыс 24 күнтізбелік күннен қысқа",
          why: "Негізгі ақы төленетін жыл сайынғы еңбек демалысы, егер ұзағырақ мерзім көзделмесе, 24 күнтізбелік күн. Бұл тармақта {n} күн берілген.",
        },
      },
    },
  };

  function fmt(s, vars) {
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return vars && vars[k] !== undefined ? vars[k] : m;
    });
  }

  window.LexLensI18n = { T: T, fmt: fmt };
})();
