import type { Lang } from "../i18n/ui";

export interface Experiencia {
  empresa: string;
  periodo: string;
  actual?: boolean; // true = trabajo actual (nodo con pulso + etiqueta "Actual")
  puesto: string;
  descripcion: string;
  puntos?: string[]; // logros o responsabilidades
  etiquetas: string[];
}

// Orden: de lo más reciente a lo más antiguo.
// ⚠️ Reglas: aquí NO van nombres de clientes (solo en el CV PDF) y NO se inventan métricas.
// ✏️ PERSONALIZA: confirma los "puesto" de Desk e Involvia y agrega en "puntos" logros reales
// (qué construiste, qué decisiones tomaste), siempre sin nombrar clientes.
export const experiencia: Record<Lang, Experiencia[]> = {
  es: [
    {
      empresa: "Origis / Inixio",
      periodo: "Mar 2024 – Actualidad",
      actual: true,
      puesto: "Líder Técnico",
      descripcion: "Liderazgo técnico de proyectos de software.",
      puntos: [
        "Lideré la migración de un sistema legacy de Delphi a .NET 8, que sentó las bases del nuevo estándar técnico de la empresa.",
      ],
      etiquetas: ["Liderazgo técnico", ".NET 8"],
    },
    {
      empresa: "Desk",
      periodo: "Ene 2023 – Ene 2024",
      puesto: "Desarrollador de software", // ✏️ confirma tu puesto
      descripcion:
        "Proyecto de pensiones para el sector gubernamental. Por su naturaleza, los detalles son confidenciales.",
      etiquetas: ["Pensiones", "Proyecto confidencial"],
    },
    {
      empresa: "Involvia",
      periodo: "Ene – Jun 2022",
      puesto: "Desarrollador de software", // ✏️ confirma tu puesto
      descripcion: "Plataforma de bolsa de trabajo interna.",
      etiquetas: ["Bolsa de trabajo", "Plataforma interna"],
    },
  ],
  en: [
    {
      empresa: "Origis / Inixio",
      periodo: "Mar 2024 – Present",
      actual: true,
      puesto: "Tech Lead",
      descripcion: "Technical leadership of software projects.",
      puntos: [
        "Led the migration of a legacy Delphi system to .NET 8, laying the foundation of the company's new technical standard.",
      ],
      etiquetas: ["Technical leadership", ".NET 8"],
    },
    {
      empresa: "Desk",
      periodo: "Jan 2023 – Jan 2024",
      puesto: "Software Developer",
      descripcion:
        "A pensions project for the public sector. Given its nature, the details are confidential.",
      etiquetas: ["Pensions", "Confidential project"],
    },
    {
      empresa: "Involvia",
      periodo: "Jan – Jun 2022",
      puesto: "Software Developer",
      descripcion: "An internal job board platform.",
      etiquetas: ["Job board", "Internal platform"],
    },
  ],
};