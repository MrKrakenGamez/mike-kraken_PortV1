// Efecto de terminal: escribe los comandos letra por letra y muestra las salidas.
// Se activa una sola vez, cuando la terminal entra en pantalla.
const esperar = (ms: number) => new Promise<void>((resolver) => setTimeout(resolver, ms));

export function iniciarTerminal(raiz: HTMLElement): void {
  // Si el usuario pide menos movimiento, se queda el texto completo, sin animar
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lineas = Array.from(raiz.querySelectorAll<HTMLElement>("[data-linea]"));
  const cursor = document.createElement("span");
  cursor.className = "cursor-terminal";

  // Guardamos el texto de cada comando y lo vaciamos. Las salidas solo se ocultan
  // (visibility) para que la caja conserve su altura y no "salte" mientras se escribe.
  const pasos = lineas.map((linea) => {
    const texto = linea.querySelector<HTMLElement>("[data-texto]");
    const original = texto?.textContent ?? "";
    const esComando = linea.dataset.tipo === "cmd";
    if (esComando && texto) texto.textContent = "";
    linea.style.visibility = "hidden";
    return { linea, texto, original, esComando };
  });

  async function reproducir(): Promise<void> {
    for (let i = 0; i < pasos.length; i++) {
      const { linea, texto, original, esComando } = pasos[i];
      linea.style.visibility = "visible";

      if (esComando && texto) {
        linea.appendChild(cursor);
        for (const caracter of Array.from(original)) {
          texto.textContent += caracter;
          await esperar(35 + Math.random() * 45); // ritmo humano, con variación
        }
        if (i < pasos.length - 1) await esperar(380);
      } else {
        cursor.remove();
        await esperar(120);
      }
    }
    // La última línea es un prompt vacío: el cursor se queda parpadeando ahí
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      if (entradas[0]?.isIntersecting) {
        observador.disconnect();
        void reproducir();
      }
    },
    { threshold: 0.4 },
  );
  observador.observe(raiz);
}