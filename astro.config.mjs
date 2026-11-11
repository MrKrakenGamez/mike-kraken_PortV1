// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [react()],
  // Resaltado de sintaxis de los bloques de código del blog
  markdown: {
    shikiConfig: { theme: "night-owl" },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});