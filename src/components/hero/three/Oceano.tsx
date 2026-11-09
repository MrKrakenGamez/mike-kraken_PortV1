import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { COMPOSICION, OLAS } from "./constants";
import { crearPaleta } from "./paleta";
import { oceanoVert, oceanoFrag } from "./shaders";

// Plano grande con olas calculadas en el vertex shader
export default function Oceano() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const paleta = useMemo(crearPaleta, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMoonAz: { value: 0 },
      uO1: { value: new THREE.Vector3(...OLAS[0]) },
      uO2: { value: new THREE.Vector3(...OLAS[1]) },
      uO3: { value: new THREE.Vector3(...OLAS[2]) },
      uColorProfundo: { value: paleta.profundo },
      uColorHorizonte: { value: paleta.horizonte },
      uColorLuna: { value: paleta.perla },
      uColorCresta: { value: paleta.cian },
    }),
    [paleta],
  );

  useFrame((state) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    // Azimut de la luna visto desde la cámara: la columna de luz la sigue aunque la cámara se mueva
    const cam = state.camera.position;
    const luna = COMPOSICION.luna.pos;
    u.uMoonAz.value = Math.atan2(luna[0] - cam.x, cam.z - luna[2]);
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, COMPOSICION.oceanoZ]}>
      <planeGeometry args={[400, 300, 200, 150]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={oceanoVert}
        fragmentShader={oceanoFrag}
      />
    </mesh>
  );
}