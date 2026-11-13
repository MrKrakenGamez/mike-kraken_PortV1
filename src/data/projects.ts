import type { Lang } from "../i18n/ui";
import { site } from "./site";

export interface Proyecto {
  id: string;
  tipo: "caso" | "cliente" | "repos";
  titulo: string;
  cliente?: string; // SIEMPRE genérico: nunca el nombre real del cliente
  descripcion: string;
  etiquetas: string[];
  slug?: string; // si tiene página de detalle
  href?: string; // enlace externo (repos)
  confidencial?: boolean;
}

export interface CasoDeEstudio {
  slug: string;
  titulo: string;
  cliente: string;
  resumen: string;
  etiquetas: string[]; // chips de la tarjeta
  de: string; // origen de la migración (diagrama)
  a: string; // destino
  problema: string[]; // cada elemento = un párrafo
  rol: string[];
  decision: string[];
  resultado: string[];
  stack: string[];
}

// ✏️ PERSONALIZA: los textos del caso son lo mínimo verificable. Amplíalos con contexto real
// (por qué migrar, qué alternativas evaluaste, cómo lo ejecutaste). Reglas: sin nombres de
// clientes y SIN métricas inventadas. Puedes añadir más párrafos a cada arreglo.
export const casos: Record<Lang, CasoDeEstudio[]> = {
  es: [
    {
      slug: "migracion-delphi-net8",
      titulo: "Migración de Delphi a .NET 8",
      cliente: "Inixio",
      resumen:
        "Cómo se modernizó un sistema legacy y se sentaron las bases del nuevo estándar técnico de la empresa.",
      etiquetas: ["Delphi", ".NET 8", "Liderazgo técnico"],
      de: "Delphi",
      a: ".NET 8",
      problema: ["Un sistema legacy construido en Delphi debía migrarse a una plataforma moderna."],
      rol: ["Líder Técnico en Inixio."],
      decision: ["Migrar el sistema de Delphi a .NET 8."],
      resultado: ["La migración dejó las bases del nuevo estándar técnico de la empresa."],
      stack: ["Delphi (origen)", "C# / .NET 8 (destino)"],
    },
  ],
  en: [
    {
      slug: "migracion-delphi-net8",
      titulo: "Migrating from Delphi to .NET 8",
      cliente: "Inixio",
      resumen:
        "How a legacy system was modernized and the foundation of the company's new technical standard was laid.",
      etiquetas: ["Delphi", ".NET 8", "Technical leadership"],
      de: "Delphi",
      a: ".NET 8",
      problema: ["A legacy system built in Delphi had to be migrated to a modern platform."],
      rol: ["Tech Lead at Inixio."],
      decision: ["Migrate the system from Delphi to .NET 8."],
      resultado: ["The migration laid the foundation of the company's new technical standard."],
      stack: ["Delphi (source)", "C# / .NET 8 (target)"],
    },
  ],
};

// Resto de proyectos: clientes SOLO en forma genérica (los nombres reales van en el CV PDF)
const otros: Record<Lang, Proyecto[]> = {
  es: [
    {
      id: "portal-afiliaciones",
      tipo: "cliente",
      titulo: "Portal de afiliaciones",
      cliente: "Cliente farmacéutico global",
      descripcion: "Portal web de afiliaciones para un cliente del sector farmacéutico.",
      etiquetas: ["Salud", "Portal web"],
    },
    {
      id: "web-service",
      tipo: "cliente",
      titulo: "Web service",
      cliente: "Cliente farmacéutico global",
      descripcion: "Servicio web (web service) para un cliente del sector farmacéutico.",
      etiquetas: ["Salud", "Web service"],
    },
    {
      id: "sitios-web",
      tipo: "cliente",
      titulo: "Sitios web",
      cliente: "Cadena farmacéutica líder en México",
      descripcion: "Sitios web para una cadena farmacéutica líder en México.",
      etiquetas: ["Retail", "Sitios web"],
    },
    {
      id: "pensiones",
      tipo: "cliente",
      titulo: "Proyecto de pensiones",
      cliente: "Sector gubernamental",
      descripcion: "Proyecto de pensiones de carácter privado. Los detalles son confidenciales.",
      etiquetas: ["Pensiones", "Confidencial"],
      confidencial: true,
    },
    {
      id: "repos",
      tipo: "repos",
      titulo: "Repositorios de práctica",
      descripcion: "Proyectos de práctica y aprendizaje, abiertos en GitHub.",
      etiquetas: ["GitHub", "Práctica"],
      href: site.social.github,
    },
  ],
  en: [
    {
      id: "portal-afiliaciones",
      tipo: "cliente",
      titulo: "Membership portal",
      cliente: "Global pharmaceutical client",
      descripcion: "A membership web portal for a client in the pharmaceutical sector.",
      etiquetas: ["Healthcare", "Web portal"],
    },
    {
      id: "web-service",
      tipo: "cliente",
      titulo: "Web service",
      cliente: "Global pharmaceutical client",
      descripcion: "A web service for a client in the pharmaceutical sector.",
      etiquetas: ["Healthcare", "Web service"],
    },
    {
      id: "sitios-web",
      tipo: "cliente",
      titulo: "Websites",
      cliente: "Leading pharmacy chain in Mexico",
      descripcion: "Websites for a leading pharmacy chain in Mexico.",
      etiquetas: ["Retail", "Websites"],
    },
    {
      id: "pensiones",
      tipo: "cliente",
      titulo: "Pensions project",
      cliente: "Public sector",
      descripcion: "A private pensions project. Details are confidential.",
      etiquetas: ["Pensions", "Confidential"],
      confidencial: true,
    },
    {
      id: "repos",
      tipo: "repos",
      titulo: "Practice repositories",
      descripcion: "Practice and learning projects, open on GitHub.",
      etiquetas: ["GitHub", "Practice"],
      href: site.social.github,
    },
  ],
};

// Lista final: primero los casos de estudio (se convierten en tarjetas), luego el resto
export function listaProyectos(lang: Lang): Proyecto[] {
  const tarjetasCaso: Proyecto[] = casos[lang].map((c) => ({
    id: c.slug,
    tipo: "caso",
    titulo: c.titulo,
    cliente: c.cliente,
    descripcion: c.resumen,
    etiquetas: c.etiquetas,
    slug: c.slug,
  }));
  return [...tarjetasCaso, ...otros[lang]];
}