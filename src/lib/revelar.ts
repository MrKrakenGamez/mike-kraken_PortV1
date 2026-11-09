// Revelado al hacer scroll, reutilizable en todas las secciones.
// Uso: agrega data-revelar (y opcionalmente data-retraso="150") a cualquier elemento.
// Mejora progresiva: si no hay JS o el usuario pide menos movimiento, todo se ve normal.
export function activarRevelado(selector = "[data-revelar]"): void {
  const elementos = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (elementos.length === 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        (entrada.target as HTMLElement).classList.add("revelado");
        observador.unobserve(entrada.target);
      }
    },
    { threshold: 0.15 },
  );

  for (const el of elementos) {
    el.classList.add("pre-revelado");
    const retraso = el.dataset.retraso;
    if (retraso) el.style.transitionDelay = `${retraso}ms`;
    observador.observe(el);
  }
}