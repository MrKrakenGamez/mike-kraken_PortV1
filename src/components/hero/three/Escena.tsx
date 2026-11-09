import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { COMPOSICION, entrada } from "./constants";
import { crearPaleta } from "./paleta";
import Cielo from "./Cielo";
import Oceano from "./Oceano";
import Barco from "./Barco";
import Kraken from "./Kraken";

export default function Escena() {
  const size = useThree((s) => s.size);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const paleta = useMemo(crearPaleta, []);

  // FOV responsivo: en pantallas poco anchas se amplía el FOV vertical para conservar
  // el ancho de la composición (con un tope para no deformar la perspectiva).
  useEffect(() => {
    const { vfovMin, vfovMax, aspectoBase } = COMPOSICION.camara;
    const tanMedioH = Math.tan(THREE.MathUtils.degToRad(vfovMin / 2)) * aspectoBase;
    const aspecto = size.width / size.height;
    const vfov = THREE.MathUtils.radToDeg(2 * Math.atan(tanMedioH / aspecto));
    camera.fov = THREE.MathUtils.clamp(vfov, vfovMin, vfovMax);
    camera.updateProjectionMatrix();
  }, [size, camera]);

  // Rig de cámara: parallax con el puntero + avance leve con el scroll
  useFrame((state, delta) => {
    const k = 1 - Math.exp(-delta * 3); // suavizado independiente de los FPS
    const cam = state.camera;
    const [, camY, camZ] = COMPOSICION.camara.pos;
    cam.position.x += (entrada.x * 0.9 - cam.position.x) * k;
    cam.position.y += (camY + entrada.y * 0.25 - cam.position.y) * k;
    cam.position.z = camZ - entrada.scroll * 3;
    cam.lookAt(...COMPOSICION.camara.mira);
  });

  return (
    <>
      {/* Luz ambiente tenue + luz de luna a contraluz + relleno cian frontal */}
      <ambientLight intensity={0.6} color={paleta.violeta} />
      <directionalLight position={COMPOSICION.luna.pos} intensity={3} color={paleta.perla} />
      <directionalLight position={[-8, 3, 12]} intensity={0.8} color={paleta.cian} />

      <Cielo />
      <Oceano />
      <Barco />
      <Kraken />

      {/* Burbujas / partículas cian alrededor del kraken */}
      <Sparkles
        count={60}
        scale={[16, 6, 6]}
        size={3}
        speed={0.5}
        opacity={0.7}
        color={paleta.cian}
        position={[19, 3, -26]}
      />
    </>
  );
}