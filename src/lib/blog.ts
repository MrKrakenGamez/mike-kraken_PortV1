import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export type Entrada = CollectionEntry<"blog">;

// Artículos de un idioma, del más reciente al más antiguo.
// Los borradores solo aparecen en desarrollo (npm run dev).
export async function postsPorIdioma(lang: Lang): Promise<Entrada[]> {
  const todos = await getCollection(
    "blog",
    ({ id, data }) => id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft),
  );
  return todos.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// "es/mi-articulo" → "mi-articulo"
export const slugDe = (id: string): string => id.split("/").slice(1).join("/");

// Tiempo de lectura estimado a 200 palabras por minuto
export function minutosLectura(texto: string | undefined): number {
  const palabras = (texto ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

export function formatearFecha(fecha: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // evita que la fecha "retroceda" un día por la zona horaria
  }).format(fecha);
}