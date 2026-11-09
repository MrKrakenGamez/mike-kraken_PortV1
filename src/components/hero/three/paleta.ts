import * as THREE from "three";
import { token } from "../../../lib/tokens";

// Colores de Three.js construidos desde los design tokens
export function crearPaleta() {
  const marino = new THREE.Color(token("--kraken-marino", "#0a1128"));
  const abismo = new THREE.Color(token("--kraken-abismo", "#05070f"));
  const violeta = new THREE.Color(token("--kraken-violeta", "#7c3aed"));
  const cian = new THREE.Color(token("--kraken-cian", "#22d3ee"));
  const neon = new THREE.Color(token("--kraken-neon", "#a855f7"));
  const perla = new THREE.Color(token("--kraken-perla", "#e6edf7"));
  const bruma = new THREE.Color(token("--kraken-bruma", "#94a3b8"));

  return {
    marino,
    abismo,
    violeta,
    cian,
    neon,
    perla,
    bruma,
    // Cielo y mar comparten este color en el horizonte para que la línea se funda
    horizonte: marino.clone().lerp(violeta, 0.4),
    profundo: marino.clone().lerp(abismo, 0.35),
    cuerpoKraken: abismo.clone().lerp(violeta, 0.22),
  };
}