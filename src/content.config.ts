import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Colección "blog": src/content/blog/es/*.md y src/content/blog/en/*.md
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false), // los borradores solo se ven en desarrollo
    cover: z.string().optional(), // ruta en /public, p. ej. /uploads/blog/portada.png
    coverAlt: z.string().optional(),
  }),
});

export const collections = { blog };