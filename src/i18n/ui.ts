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
