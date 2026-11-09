// Lee un design token (variable CSS) en el navegador para que la escena 3D
// use la MISMA paleta que tokens.css (una sola fuente de verdad).
export function token(nombre: string, respaldo: string): string {
  if (typeof document === "undefined") return respaldo;
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(nombre)
    .trim();
  return valor || respaldo;
}