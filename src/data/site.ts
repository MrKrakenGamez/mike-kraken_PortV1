// Datos globales del sitio. ⚠️ Reemplaza los valores TODO por los tuyos reales.
export const site = {
  name: "Mike Kraken",
  fullName: "Miguel Angel Gamez Guadarrama",
  email: "mgamez_mrkraken@outlook.com",
  social: {
    github: "https://github.com/MrKrakenGamez",
    // linkedin: "https://www.linkedin.com/in/TU_USUARIO", // TODO
    // instagram: "https://www.instagram.com/TU_USUARIO", // TODO
  },
   // PDFs del CV (se guardan en /public/cv/). El CV real sí puede nombrar clientes.
  cv: {
    es: "/cv/Mike-Kraken-CV-ES.pdf",
    en: "/cv/Mike-Kraken-CV-EN.pdf",
    ja:"/cv/Mike-Kraken-CV-JA.pdf",
  },
} as const;