// Inclinación 3D de tarjetas siguiendo al puntero, con brillo que acompaña al mouse.
// Uso: agrega data-tilt a cualquier elemento. Se desactiva en táctiles y con reduced-motion.
export function activarTilt(selector = "[data-tilt]", maxGrados = 7): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(hover: none)").matches) return; // pantallas táctiles

  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.classList.add("tilt-card");
    let cuadro = 0;

    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(px - 0.5) * 2 * maxGrados}deg`);
        el.style.setProperty("--rx", `${-(py - 0.5) * 2 * maxGrados}deg`);
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
      });
    };

    const salir = () => {
      cancelAnimationFrame(cuadro);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", salir);
  });
}