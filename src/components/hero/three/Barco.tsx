import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { COMPOSICION, alturaOla } from "./constants";
import { crearPaleta } from "./paleta";

// Barco en silueta, construido con geometrías simples. Flota siguiendo la misma ola que el shader.
export default function Barco() {
  const grupo = useRef<THREE.Group>(null);
  const paleta = useMemo(crearPaleta, []);
  const { pos, escala } = COMPOSICION.barco;

  const casco = useMemo(() => {
    const forma = new THREE.Shape();
    forma.moveTo(-1.2, 0.2);
    forma.lineTo(1.3, 0.35);
    forma.lineTo(0.95, -0.25);
    forma.lineTo(-0.85, -0.25);
    forma.closePath();
    const g = new THREE.ExtrudeGeometry(forma, { depth: 0.6, bevelEnabled: false });
    g.translate(0, 0, -0.3);
    return g;
  }, []);

  // Vela con panza: curva desde la base hasta la punta del mástil
  const vela = useMemo(() => {
    const forma = new THREE.Shape();
    forma.moveTo(0, 0);
    forma.quadraticCurveTo(0.75, 0.75, 0, 1.5);
    forma.closePath();
    return new THREE.ShapeGeometry(forma);
  }, []);

  useFrame((state) => {
    if (!grupo.current) return;
    const t = state.clock.elapsedTime;
    // coordenada local "y" del plano del mar = oceanoZ - z del mundo
    const y = alturaOla(pos[0], COMPOSICION.oceanoZ - pos[2], t);
    grupo.current.position.y = pos[1] + y + 0.1;
    grupo.current.rotation.z = Math.sin(t * 0.9) * 0.03;
    grupo.current.rotation.x = Math.sin(t * 0.7 + 1) * 0.015;
  });

  return (
    <group ref={grupo} position={pos} scale={escala}>
      <mesh geometry={casco}>
        <meshBasicMaterial color={paleta.abismo} />
      </mesh>

      {/* Mástiles */}
      <mesh position={[0.1, 1.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.9, 6]} />
        <meshBasicMaterial color={paleta.abismo} />
      </mesh>
      <mesh position={[-0.6, 0.9, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.4, 6]} />
        <meshBasicMaterial color={paleta.abismo} />
      </mesh>

      {/* Velas */}
      <mesh geometry={vela} position={[0.12, 0.35, 0]}>
        <meshBasicMaterial color={paleta.abismo} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={vela} position={[-0.58, 0.3, 0]} scale={0.75}>
        <meshBasicMaterial color={paleta.abismo} side={THREE.DoubleSide} />
      </mesh>

      {/* Farol de proa: punto cian con halo */}
      <mesh position={[-1.1, 0.42, 0.35]}>
        <sphereGeometry args={[0.06, 12, 8]} />
        <meshBasicMaterial color={paleta.cian} toneMapped={false} />
      </mesh>
      <mesh position={[-1.1, 0.42, 0.35]}>
        <sphereGeometry args={[0.22, 12, 8]} />
        <meshBasicMaterial color={paleta.cian} transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  );
}