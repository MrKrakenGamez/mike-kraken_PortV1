import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { COMPOSICION, entrada } from "./constants";
import { crearPaleta } from "./paleta";

const SEGMENTOS = 44; // esferas por tentáculo (se solapan y forman un cuerpo continuo)
const BASE_Y = -1.2; // la base queda bajo el agua: el océano la oculta

interface DatosTentaculo {
  x: number;
  z: number;
  altura: number;
  grosor: number;
  dir: number;
  fase: number;
}

// Un tentáculo = esferas instanciadas a lo largo de una curva que se recalcula cada frame.
// Así se anima (oleaje + inclinación hacia el puntero) sin geometrías complejas.
function Tentaculo({ x, z, altura, grosor, dir, fase }: DatosTentaculo) {
  const cuerpo = useRef<THREE.InstancedMesh>(null);
  const ventosas = useRef<THREE.InstancedMesh>(null);
  const aux = useMemo(() => new THREE.Object3D(), []);
  const paleta = useMemo(crearPaleta, []);

  useFrame((state) => {
    const m = cuerpo.current;
    const v = ventosas.current;
    if (!m || !v) return;
    const t = state.clock.elapsedTime;
    let nv = 0;

    for (let i = 0; i < SEGMENTOS; i++) {
      const s = i / (SEGMENTOS - 1); // 0 = base, 1 = punta
      const oleaje = Math.sin(t * 0.7 + fase + s * 3) * 0.45 * s;
      const sigue = entrada.x * 1.4 * s; // la punta se inclina hacia el puntero

      // Línea central: sube, se curva hacia "dir" y la punta hace un gancho
      const px = x + dir * (1.4 * Math.sin(s * 2.4) + 2.2 * s ** 3) + oleaje + sigue;
      const py = BASE_Y + (altura / 0.75) * (s - 0.25 * s ** 4);
      const pz = z + 0.8 * Math.sin(s * 3 + fase);
      const r = grosor * (1 - s) ** 0.9 + 0.04; // se afina hacia la punta

      aux.position.set(px, py, pz);
      aux.scale.setScalar(r);
      aux.updateMatrix();
      m.setMatrixAt(i, aux.matrix);

      // Ventosas: puntos luminosos en la cara que mira a la cámara
      if (i % 2 === 0 && s > 0.08 && s < 0.92) {
        aux.position.set(px, py, pz + r * 0.85);
        aux.scale.setScalar(r * 0.22);
        aux.updateMatrix();
        v.setMatrixAt(nv++, aux.matrix);
      }
    }

    m.instanceMatrix.needsUpdate = true;
    v.count = nv;
    v.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={cuerpo} args={[undefined, undefined, SEGMENTOS]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial
          color={paleta.cuerpoKraken}
          roughness={0.5}
          metalness={0.1}
          emissive={paleta.violeta}
          emissiveIntensity={0.12}
        />
      </instancedMesh>
      <instancedMesh ref={ventosas} args={[undefined, undefined, SEGMENTOS]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial color={paleta.neon} toneMapped={false} />
      </instancedMesh>
    </>
  );
}

export default function Kraken() {
  const grupo = useRef<THREE.Group>(null);

  // Al hacer scroll, el kraken se hunde de nuevo en el mar
  useFrame(() => {
    if (grupo.current) grupo.current.position.y = -entrada.scroll * 8;
  });

  return (
    <group ref={grupo}>
      {COMPOSICION.kraken.map((datos, i) => (
        <Tentaculo key={i} {...datos} />
      ))}
    </group>
  );
}