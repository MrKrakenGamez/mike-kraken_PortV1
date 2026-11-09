import { ui, defaultLang, type Lang, type UIKey } from "./ui";

// Detecta el idioma según el primer segmento de la URL (/es/..., /en/...)
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return segment && segment in ui ? (segment as Lang) : defaultLang;
}

// Devuelve una función t("clave") que traduce con fallback al idioma por defecto
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

// Convierte /es/blog/post/ → /en/blog/post/ (mismo contenido, otro idioma)
export function switchLangPath(pathname: string, target: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && segments[0] in ui) segments.shift();
  const trailing = pathname.endsWith("/") ? "/" : "";
  return `/${[target, ...segments].join("/")}${trailing}`;
}