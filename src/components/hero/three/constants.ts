// Constantes compartidas por toda la escena 3D.
// 👉 Para mover la composición (luna, barco, tentáculos) solo tocas este archivo.

export type V3 = [number, number, number];

export const COMPOSICION = {
  camara: {
    pos: [0, 1.5, 12] as V3,
    mira: [0, 3.2, 0] as V3, // mirar un poco hacia arriba deja el horizonte en el tercio inferior
    vfovMin: 45,
    vfovMax: 68,
    aspectoBase: 1.8, // aspecto de pantalla para el que se diseñó la composición
  },
  luna: { pos: [17, 19, -40] as V3, radio: 3.2 },
  barco: { pos: [10, 0, -35] as V3, escala: 3 },
  oceanoZ: -120, // el plano del mar se centra en este Z
  // altura = lo que sobresale del agua aprox.; dir = hacia dónde se curva la punta
  kraken: [
    { x: 16, z: -30, altura: 10.5, grosor: 0.65, dir: -1, fase: 0 },
    { x: 23, z: -34, altura: 8.5, grosor: 0.55, dir: 1, fase: 2 },
    { x: 19, z: -24, altura: 4.5, grosor: 0.4, dir: -1, fase: 4 },
  ],
};

// Olas: [amplitud, frecuencia, velocidad]. Las usan el shader Y el barco (para flotar sincronizado).
export const OLAS: V3[] = [
  [0.18, 0.35, 0.8],
  [0.14, 0.28, 0.6],
  [0.07, 0.6, 1.3],
];

// Misma fórmula que el vertex shader del océano (coordenadas locales del plano: x, y)
export function alturaOla(x: number, y: number, t: number): number {
  const [o1, o2, o3] = OLAS;
  return (
    o1[0] * Math.sin(o1[1] * x + o1[2] * t) +
    o2[0] * Math.sin(o2[1] * y + o2[2] * t) +
    o3[0] * Math.sin(o3[1] * (x + y) + o3[2] * t)
  );
}

// Entrada del usuario compartida sin re-renders de React
export const entrada = {
  x: 0, // puntero horizontal: -1 (izq) … 1 (der)
  y: 0, // puntero vertical: -1 (abajo) … 1 (arriba)
  scroll: 0, // 0 (arriba) … 1 (hero fuera de pantalla)
};