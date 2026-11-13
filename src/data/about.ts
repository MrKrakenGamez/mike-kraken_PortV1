import type { Lang } from "../i18n/ui";

// tipo: cmd = comando que se "escribe", out = salida, ok = salida destacada en cian
export interface Linea {
  tipo: "cmd" | "out" | "ok";
  texto: string;
}

export const terminal: Record<Lang, Linea[]> = {
  es: [
    { tipo: "cmd", texto: "whoami" },
    { tipo: "out", texto: "Miguel Angel Gamez Guadarrama" },
    { tipo: "cmd", texto: "cat rol.txt" },
    { tipo: "out", texto: "Full Stack Developer · DevOps · Líder Técnico" },
    { tipo: "cmd", texto: "cat stack.json" },
    { tipo: "out", texto: "{" },
    { tipo: "out", texto: '  "backend": ["C#/.NET", "PHP", "JavaScript"],' },
    { tipo: "out", texto: '  "frontend": ["Angular", "React"],' },
    { tipo: "out", texto: '  "cloud": ["Azure", "AWS"],' },
    { tipo: "out", texto: '  "datos": ["SQL Server"]' },
    { tipo: "out", texto: "}" },
    { tipo: "cmd", texto: "ls industrias/" },
    { tipo: "out", texto: "fintech/  salud/  retail/" },
    { tipo: "cmd", texto: "./disponible.sh" },
    { tipo: "ok", texto: "✔ Abierto a empleo remoto o presencial" },
    { tipo: "ok", texto: "✔ Abierto a freelance y consultoría" },
    { tipo: "cmd", texto: "" }, // prompt final con cursor parpadeando
  ],
  en: [
    { tipo: "cmd", texto: "whoami" },
    { tipo: "out", texto: "Miguel Angel Gamez Guadarrama" },
    { tipo: "cmd", texto: "cat role.txt" },
    { tipo: "out", texto: "Full Stack Developer · DevOps · Tech Lead" },
    { tipo: "cmd", texto: "cat stack.json" },
    { tipo: "out", texto: "{" },
    { tipo: "out", texto: '  "backend": ["C#/.NET", "PHP", "JavaScript"],' },
    { tipo: "out", texto: '  "frontend": ["Angular", "React"],' },
    { tipo: "out", texto: '  "cloud": ["Azure", "AWS"],' },
    { tipo: "out", texto: '  "data": ["SQL Server"]' },
    { tipo: "out", texto: "}" },
    { tipo: "cmd", texto: "ls industries/" },
    { tipo: "out", texto: "fintech/  healthcare/  retail/" },
    { tipo: "cmd", texto: "./available.sh" },
    { tipo: "ok", texto: "✔ Open to remote or on-site roles" },
    { tipo: "ok", texto: "✔ Open to freelance and consulting" },
    { tipo: "cmd", texto: "" },
  ],
};