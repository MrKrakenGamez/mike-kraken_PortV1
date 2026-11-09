import { Suspense, lazy, useEffect, useState } from "react";

// Three.js y R3F viven SOLO en este chunk diferido: no se descargan si el equipo no califica.
const Lienzo = lazy(() => import("./three/Lienzo"));

// Decide si vale la pena el 3D. Si devuelve false, queda el Hero estático (SVG).
function puedeUsar3D(): boolean {
  const coincide = (q: string) => window.matchMedia(q).matches;

  if (coincide("(prefers-reduced-motion: reduce)")) return false;
  if (!coincide("(min-width: 768px)")) return false; // móvil: fallback estático

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return false; // modo ahorro de datos
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;

  // ¿Hay WebGL? (y se libera el contexto de prueba enseguida)
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    setActivo(puedeUsar3D());
  }, []);

  if (!activo) return null;

  return (
    <Suspense fallback={null}>
      <Lienzo />
    </Suspense>
  );
}