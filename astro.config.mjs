// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // i18n nativo: el sitio vive en /es/... y /en/...
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true, // también el español lleva prefijo: /es/
      redirectToDefaultLocale: true, // "/" redirige automáticamente a /es/
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});