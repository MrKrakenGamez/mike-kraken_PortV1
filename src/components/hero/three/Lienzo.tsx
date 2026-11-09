import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Escena from "./Escena";
import { COMPOSICION, entrada } from "./constants";

// Canvas WebGL. Este módulo (y todo Three.js) se carga de forma diferida.
export default function Lienzo() {
  const contenedor = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [listo, setListo] = useState(false);

  // Puntero y scroll normalizados, compartidos con la escena sin provocar re-renders.
  // (Se escuchan en window porque el texto del Hero está por encima del canvas.)
  useEffect(() => {
    const alMover = (e: PointerEvent) => {
      entrada.x = (e.clientX / window.innerWidth) * 2 - 1;
      entrada.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const alScroll = () => {
      entrada.scroll = Math.min(1, window.scrollY / window.innerHeight);
    };
    window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("scroll", alScroll, { passive: true });
    alScroll();
    return () => {
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("scroll", alScroll);
    };
  }, []);

  // Performance: se pausa el renderizado cuando el Hero sale de pantalla
  useEffect(() => {
    const el = contenedor.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={contenedor}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
      className={`absolute inset-0 transition-opacity duration-1000 ${listo ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        flat // sin tone mapping: respeta los colores exactos de la paleta
        dpr={[1, 1.5]} // limita la densidad de píxeles (rendimiento)
        frameloop={visible ? "always" : "never"}
        camera={{
          fov: COMPOSICION.camara.vfovMin,
          near: 0.1,
          far: 400,
          position: COMPOSICION.camara.pos,
        }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={() => setListo(true)}
      >
        <Escena />
      </Canvas>
    </div>
  );
}