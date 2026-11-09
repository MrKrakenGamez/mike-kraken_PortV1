// Shaders en GLSL. Cada uno termina con colorspace_fragment para que los colores
// salgan correctamente en sRGB (Canvas usa "flat": sin tone mapping).

// ---------- Cielo: degradado cenit → medio → horizonte ----------
export const cieloVert = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const cieloFrag = /* glsl */ `
  uniform vec3 uCenit;
  uniform vec3 uMedio;
  uniform vec3 uHorizonte;
  varying vec3 vDir;
  void main() {
    float h = clamp(vDir.y, 0.0, 1.0);
    vec3 col = mix(uHorizonte, uMedio, smoothstep(0.0, 0.18, h));
    col = mix(col, uCenit, smoothstep(0.12, 0.7, h));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

// ---------- Halo de la luna: disco con caída radial, mezcla aditiva ----------
export const haloVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const haloFrag = /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = pow(clamp(1.0 - d, 0.0, 1.0), 2.2);
    gl_FragColor = vec4(uColor, a * 0.55);
    #include <colorspace_fragment>
  }
`;

// ---------- Océano ----------
// uO1..uO3 = (amplitud, frecuencia, velocidad) de tres ondas senoidales.
// El plano se rota -90° en X: coordenadas locales (x,y,z) → mundo (x, z, -y).
export const oceanoVert = /* glsl */ `
  uniform float uTime;
  uniform vec3 uO1;
  uniform vec3 uO2;
  uniform vec3 uO3;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vElev;

  void main() {
    vec3 p = position;
    float f1 = uO1.y * p.x + uO1.z * uTime;
    float f2 = uO2.y * p.y + uO2.z * uTime;
    float f3 = uO3.y * (p.x + p.y) + uO3.z * uTime;

    float e = uO1.x * sin(f1) + uO2.x * sin(f2) + uO3.x * sin(f3);
    float dEdx = uO1.x * uO1.y * cos(f1) + uO3.x * uO3.y * cos(f3);
    float dEdy = uO2.x * uO2.y * cos(f2) + uO3.x * uO3.y * cos(f3);

    p.z += e;
    vElev = e;
    // normal analítica de la superficie, ya convertida a coordenadas de mundo
    vNormal = normalize(vec3(-dEdx, 1.0, dEdy));

    vec4 wp = modelMatrix * vec4(p, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const oceanoFrag = /* glsl */ `
  uniform vec3 uColorProfundo;
  uniform vec3 uColorHorizonte;
  uniform vec3 uColorLuna;
  uniform vec3 uColorCresta;
  uniform float uTime;
  uniform float uMoonAz;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vElev;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 toCam = cameraPosition - vWorldPos;
    float dist = length(toCam);
    vec3 V = toCam / dist;

    // Fresnel: más reflejo cuando se mira el agua en ángulo rasante
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
    float lejania = smoothstep(12.0, 95.0, dist);

    vec3 col = mix(uColorProfundo, uColorHorizonte, lejania);
    col += uColorHorizonte * fres * 0.5;
    col += uColorCresta * smoothstep(0.2, 0.36, vElev) * 0.35; // brillo cian en crestas

    // Columna de luz de la luna (estilizada): franja bajo la luna, rota por las olas
    float az = atan(vWorldPos.x - cameraPosition.x, cameraPosition.z - vWorldPos.z);
    float da = (az - uMoonAz) / (0.025 + 0.5 / dist);
    float columna = exp(-da * da);
    float rotura = smoothstep(
      0.45, 0.95,
      0.5 + 0.5 * sin(vWorldPos.z * 1.3 + vWorldPos.x * 3.0 + uTime * 1.4) + N.x * 5.0
    );
    col += uColorLuna * columna * rotura * smoothstep(15.0, 50.0, dist) * 0.9;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;