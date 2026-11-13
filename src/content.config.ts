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

// Colección "testimonios": un archivo por persona, con cita en español y/o inglés
const testimonios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonios" }),
  schema: z
    .object({
      nombre: z.string(),
      cargo: z.string(), // cargo o relación (p. ej. "Líder de proyecto")
      organizacion: z.string().optional(), // puede ser genérica: "Cliente del sector salud"
      enlace: z.string().url().optional(), // LinkedIn de la persona (opcional)
      foto: z.string().optional(),
      orden: z.number().default(1),
      draft: z.boolean().default(true), // por seguridad, nace como borrador
      cita_es: z.string().optional(),
      cita_en: z.string().optional(),
    })
    .refine((d) => d.cita_es || d.cita_en, {
      message: "Falta al menos una cita (cita_es o cita_en).",
    }),
});

export const collections = { blog, testimonios };