import { getCollection } from "astro:content";

// Testimonios publicados, ordenados por el campo "orden".
// Los borradores solo aparecen en desarrollo (npm run dev).
export async function testimoniosPublicados() {
  const todos = await getCollection(
    "testimonios",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return todos.sort((a, b) => a.data.orden - b.data.orden);
}