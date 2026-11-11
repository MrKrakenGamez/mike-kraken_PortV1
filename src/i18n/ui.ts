// Diccionario de textos de la interfaz. Ambos idiomas deben tener las MISMAS claves.
export const languages = {
  es: "Español",
  en: "English",
  // ja: "Japanese",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "es";

export const ui = {
  es: {
    "meta.description":
      "Portafolio de Mike Kraken — Full Stack Developer, DevOps y Líder Técnico.",
    "nav.main": "Navegación principal",
    "nav.skip": "Saltar al contenido",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.menuOpen": "Abrir menú",
    "nav.menuClose": "Cerrar menú",
    "nav.home": "Mike Kraken — ir al inicio",
    "lang.label": "Cambiar idioma",
    "footer.tagline": "Forjado en las profundidades del código.",
    "footer.social": "Redes y contacto",
    "footer.rights": "Todos los derechos reservados.",
    // "hero.greeting": "Hola, Mike Kraken",
    // "hero.tagline":
    //   "Full Stack Developer · DevOps · Líder Técnico. Bienvenido a las profundidades.",
    // "hero.cta": "Sumergirse",
    "hero.whoami": "quien soy",
    "hero.eyebrow": "quien soy?",
    "hero.hello": "Hola, soy",
    "hero.role1": "Full Stack Developer",
    "hero.role2": "DevOps",
    "hero.role3": "Líder Técnico",
    "hero.tagline":
      "5 años construyendo software para fintech, salud y retail. Backend en C#/.NET, frontend en Angular y React, desplegado en Azure y AWS.",
    "hero.ctaCv": "Descargar CV",
    "hero.ctaContact": "Contáctame",
    "hero.scroll": "Desliza para sumergirte",
    "about.eyebrow": "cat sobre-mi.md",
    "about.title": "Sobre mí",
    // ✏️ PERSONALIZA: el párrafo p4 es un borrador. Cámbialo por algo tuyo
    // (qué te mueve fuera del código, hobbies, cómo trabajas con equipos).
    "about.p1":
      "Soy Miguel Angel, y en la red me conocen como Mike Kraken. Tengo 27 años y me dedico a construir software que se mantiene en pie cuando importa.",
    "about.p2":
      "Llevo 5 años como desarrollador e ingeniero de software y hoy trabajo como líder técnico. Me muevo de punta a punta: backend en C#/.NET, interfaces en Angular y React, y la nube en Azure y AWS, con experiencia en fintech, salud y retail.",
    "about.p3":
      "En Inixio lideré la migración de un sistema legacy de Delphi a .NET 8. El resultado fue la base del nuevo estándar técnico de la empresa.",
    "about.p4":
      "El kraken es mi marca porque me gusta lo que vive en lo profundo: los sistemas que casi nadie ve, pero que sostienen todo lo demás.",
    "about.fact1.value": "5 años",
    "about.fact1.label": "como desarrollador e ingeniero de software",
    "about.fact2.value": "3 industrias",
    "about.fact2.label": "fintech, salud y retail",
    "about.fact3.value": "ES · EN",
    "about.fact3.label": "español e inglés",
    "about.terminalTitle": "mike@kraken: ~",
    "about.terminalDesc": "Resumen de perfil en formato de terminal.",
    "exp.eyebrow": "git log --oneline",
    "exp.title": "Experiencia",
    "exp.subtitle":
      "Mi recorrido profesional, del más reciente al más antiguo.",
    "exp.current": "Actual",
    "exp.list": "Línea de tiempo de experiencia profesional",
    "exp.cvNote":
      "Para el detalle completo de proyectos y clientes, descarga mi CV.",
    "nav.demo": "Demo",
    "demo.eyebrow": "./demo.sh",
    "demo.title": "Demo interactivo",
    "demo.subtitle":
      "Un pipeline CI/CD simulado: elige la nube, rompe una prueba a propósito y mira cómo reacciona.",
    "nav.blog": "Blog",
    "blog.eyebrow": "ls blog/",
    "blog.title": "Blog",
    "blog.subtitle":
      "Notas técnicas sobre desarrollo de software, arquitectura y DevOps.",
    "blog.empty": "Todavía no hay artículos. Vuelve pronto.",
    "blog.readMore": "Leer artículo",
    "blog.minRead": "min de lectura",
    "blog.back": "Volver al blog",
    "blog.all": "Ver todos los artículos",
    "blog.draft": "Borrador",
  },
  en: {
    "meta.description":
      "Mike Kraken's portfolio — Full Stack Developer, DevOps and Tech Lead.",
    "nav.main": "Main navigation",
    "nav.skip": "Skip to content",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.menuOpen": "Open menu",
    "nav.menuClose": "Close menu",
    "nav.home": "Mike Kraken — go to home",
    "lang.label": "Change language",
    "footer.tagline": "Forged in the depths of code.",
    "footer.social": "Social links and contact",
    "footer.rights": "All rights reserved.",
    // "hero.greeting": "Hi, I'm Mike Kraken",
    // "hero.tagline":
    //   "Full Stack Developer · DevOps · Tech Lead. Welcome to the depths.",
    // "hero.cta": "Dive in",
    "hero.whoami": "quien soy",

    "hero.eyebrow": "whoami",
    "hero.hello": "Hi, I'm",
    "hero.role1": "Full Stack Developer",
    "hero.role2": "DevOps",
    "hero.role3": "Tech Lead",
    "hero.tagline":
      "5 years building software for fintech, healthcare and retail. C#/.NET backends, Angular and React frontends, deployed on Azure and AWS.",
    "hero.ctaCv": "Download CV",
    "hero.ctaContact": "Get in touch",
    "hero.scroll": "Scroll to dive in",
    "about.eyebrow": "cat about.md",
    "about.title": "About me",
    // ✏️ PERSONALIZE: p4 is a draft. Replace it with something of your own.
    "about.p1":
      "I'm Miguel Angel, known online as Mike Kraken. I'm 27 and I build software that holds up when it matters.",
    "about.p2":
      "I've spent 5 years as a software developer and engineer, and today I work as a tech lead. I work end to end: C#/.NET backends, Angular and React interfaces, and cloud on Azure and AWS, with experience in fintech, healthcare and retail.",
    "about.p3":
      "At Inixio I led the migration of a legacy Delphi system to .NET 8. The result became the foundation of the company's new technical standard.",
    "about.p4":
      "The kraken is my brand because I like what lives in the deep: the systems almost nobody sees, yet that hold everything else up.",
    "about.fact1.value": "5 years",
    "about.fact1.label": "as a software developer and engineer",
    "about.fact2.value": "3 industries",
    "about.fact2.label": "fintech, healthcare and retail",
    "about.fact3.value": "ES · EN",
    "about.fact3.label": "Spanish and English",
    "about.terminalTitle": "mike@kraken: ~",
    "about.terminalDesc": "Profile summary in terminal format.",
    "exp.eyebrow": "git log --oneline",
    "exp.title": "Experience",
    "exp.subtitle": "My professional path, most recent first.",
    "exp.current": "Current",
    "exp.list": "Professional experience timeline",
    "exp.cvNote":
      "For the full detail on projects and clients, download my CV.",
    "nav.demo": "Demo",
    "demo.eyebrow": "./demo.sh",
    "demo.title": "Interactive demo",
    "demo.subtitle":
      "A simulated CI/CD pipeline: pick the cloud, break a test on purpose and watch how it reacts.",
    "nav.blog": "Blog",
    "blog.eyebrow": "ls blog/",
    "blog.title": "Blog",
    "blog.subtitle":
      "Technical notes on software development, architecture and DevOps.",
    "blog.empty": "No articles yet. Check back soon.",
    "blog.readMore": "Read article",
    "blog.minRead": "min read",
    "blog.back": "Back to blog",
    "blog.all": "View all articles",
    "blog.draft": "Draft",
  },
  // ja: {
  //   "meta.description":
  //     "Mike Krakenのポートフォリオ — フルスタック開発者、DevOps、テックリード。",
  //   "nav.main": "メインナビゲーション",
  //   "nav.skip": "コンテンツへスキップ",
  //   "nav.about": "プロフィール",
  //   "nav.experience": "経歴",
  //   "nav.projects": "プロジェクト",
  //   "nav.contact": "お問い合わせ",
  //   "nav.menuOpen": "メニューを開く",
  //   "nav.menuClose": "メニューを閉じる",
  //   "nav.home": "Mike Kraken — ホームへ戻る",
  //   "lang.label": "言語を変更",
  //   "footer.tagline": "コードの深淵から鍛え上げられた。",
  //   "footer.social": "ソーシャルリンクとお問い合わせ",
  //   "footer.rights": "All rights reserved.",
  //   // "hero.greeting": "こんにちは、Mike Krakenです",
  //   // "hero.tagline":
  //   //   "フルスタック開発者 · DevOps · テックリード。深淵へようこそ。",
  //   // "hero.cta": "飛び込む",
  //   "hero.whoami": "quien soy",

  //   "hero.eyebrow": "whoami",
  //   "hero.hello": "こんにちは、私は",
  //   "hero.role1": "フルスタック開発者",
  //   "hero.role2": "DevOps",
  //   "hero.role3": "テックリード",
  //   "hero.tagline":
  //     "フィンテック、ヘルスケア、小売業界で5年間ソフトウェア開発に携わってきました。C#/.NETによるバックエンド、AngularとReactによるフロントエンドを開発し、AzureとAWSへのデプロイ経験があります。",
  //   "hero.ctaCv": "履歴書をダウンロード",
  //   "hero.ctaContact": "お問い合わせ",
  //   "hero.scroll": "スクロールして深淵へ",
  // },
} as const;

export type UIKey = keyof (typeof ui)["es"];
