// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    // Tailwind v4 se registra como plugin de Vite (NO como integración de Astro)
    plugins: [tailwindcss()],
  },
});