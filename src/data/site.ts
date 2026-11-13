// Datos globales del sitio. ⚠️ Reemplaza los valores TODO por los tuyos reales.
export const site = {
  name: "Mike",
  fullName: "Miguel Angel Gamez Guadarrama",
  email: "mgamez_mrkraken@outlook.com",
  social: {
    github: "https://github.com/MrKrakenGamez",
    // linkedin: "https://www.linkedin.com/in/TU_USUARIO", // TODO
    // instagram: "https://www.instagram.com/TU_USUARIO", // TODO
  },
   // PDFs del CV (se guardan en /public/cv/). El CV real sí puede nombrar clientes.
  cv: {
    es: "/public/CV/BJJ1.jpg",
    en: "/public/CV/gannya.jpg",
    // ja:"/cv/Mike-Kraken-CV-JA.pdf",
  },
  // Proveedor del formulario de contacto:
  //  - "netlify": Netlify Forms (solo funciona si el sitio se despliega en Netlify)
  //  - "formspree": Formspree (funciona en cualquier hosting: crea un formulario gratis y pega su URL)
  formulario: {
    proveedor: "netlify" as "netlify" | "formspree",
    formspreeUrl: "https://formspree.io/f/TU_ID", // TODO: solo si usas Formspree
  },
} as const;