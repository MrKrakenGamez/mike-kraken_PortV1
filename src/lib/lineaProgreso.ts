// Línea de tiempo con progreso: el relleno crece con el scroll y los nodos se "encienden"
// (clase "alcanzado") cuando la línea los supera.
export function iniciarLineaProgreso(contenedor: HTMLElement): void {
  const relleno = contenedor.querySelector<HTMLElement>("[data-progreso]");
  const nodos = Array.from(contenedor.querySelectorAll<HTMLElement>("[data-nodo]"));
  if (!relleno) return;

  // Esta clase activa los estilos de "nodo apagado". Sin JS, todos los nodos se ven encendidos.
  contenedor.classList.add("con-progreso");

  // Reduced motion: línea completa y nodos encendidos, sin seguir el scroll
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    relleno.style.height = "100%";
    nodos.forEach((n) => n.classList.add("alcanzado"));
    return;
  }

  const actualizar = () => {
    const caja = contenedor.getBoundingClientRect();
    const lectura = window.innerHeight * 0.6; // punto de la pantalla que "lee" la línea
    const avance = Math.min(Math.max(lectura - caja.top, 0), caja.height);
    relleno.style.height = `${avance}px`;

    for (const nodo of nodos) {
      const r = nodo.getBoundingClientRect();
      const yNodo = r.top + r.height / 2 - caja.top; // posición del nodo dentro del contenedor
      nodo.classList.toggle("alcanzado", yNodo <= avance);
    }
  };

  // Throttle con requestAnimationFrame para no recalcular en cada evento
  let pendiente = false;
  const programar = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      actualizar();
    });
  };

  window.addEventListener("scroll", programar, { passive: true });
  window.addEventListener("resize", programar, { passive: true });
  actualizar();
}