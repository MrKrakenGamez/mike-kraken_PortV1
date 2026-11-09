import { useMemo } from "react";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { COMPOSICION, entrada } from "./constants";
import { crearPaleta } from "./paleta";
import { cieloVert, cieloFrag, haloVert, haloFrag } from "./shaders";

// Domo de cielo + estrellas con parallax + luna con halo y cráteres
export default function Cielo() {
  const paleta = useMemo(crearPaleta, []);
  const { pos, radio } = COMPOSICION.luna;
  const estrellas = useRef<THREE.Group>(null);

  const uniformsCielo = useMemo(
    () => ({
      uCenit: { value: paleta.abismo },
      uMedio: { value: paleta.marino },
      uHorizonte: { value: paleta.horizonte },
    }),
    [paleta],
  );
  const uniformsHalo = useMemo(() => ({ uColor: { value: paleta.cian } }), [paleta]);

  // Las estrellas giran muy despacio y se desplazan un poco con el puntero (parallax)
  useFrame((state) => {
    if (!estrellas.current) return;
    estrellas.current.rotation.y = state.clock.elapsedTime * 0.004 + entrada.x * 0.03;
    estrellas.current.rotation.x = entrada.y * 0.015;
  });

  return (
    <>
      {/* Domo del cielo (se dibuja primero y no escribe profundidad) */}
      <mesh renderOrder={-10}>
        <sphereGeometry args={[150, 32, 16]} />
        <shaderMaterial
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={uniformsCielo}
          vertexShader={cieloVert}
          fragmentShader={cieloFrag}
        />
      </mesh>

      <group ref={estrellas}>
        <Stars radius={130} depth={40} count={2200} factor={5} saturation={0} fade speed={0.8} />
      </group>

      {/* Halo */}
      <mesh position={[pos[0], pos[1], pos[2] - 0.5]}>
        <planeGeometry args={[38, 38]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniformsHalo}
          vertexShader={haloVert}
          fragmentShader={haloFrag}
        />
      </mesh>

      {/* Luna y cráteres */}
      <group position={pos}>
        <mesh>
          <sphereGeometry args={[radio, 48, 32]} />
          <meshBasicMaterial color={paleta.perla} toneMapped={false} />
        </mesh>
        {[
          { x: -0.9, y: 0.5, z: 3.03, r: 0.45 },
          { x: 0.8, y: -0.7, z: 3.02, r: 0.55 },
          { x: 0.3, y: 1.1, z: 2.99, r: 0.25 },
        ].map((c, i) => (
          <mesh key={i} position={[c.x, c.y, c.z]}>
            <circleGeometry args={[c.r, 24]} />
            <meshBasicMaterial color={paleta.bruma} transparent opacity={0.28} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}