import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion, type Variants } from "motion/react";
import { COMANDOS, HERRAMIENTAS, ORDEN, demoTextos, type Nube } from "../../data/demo";
import type { Lang } from "../../i18n/ui";

type Estado = "pendiente" | "corriendo" | "ok" | "fallo" | "omitida";
type TipoLog = "cmd" | "info" | "ok" | "error";
type Resultado = "ok" | "fallo" | null;

interface EntradaLog {
  id: number;
  tipo: TipoLog;
  texto: string;
}

const esperar = (ms: number) => new Promise<void>((resolver) => setTimeout(resolver, ms));

// El tipo de línea se deduce del símbolo con el que empieza
const tipoDe = (texto: string): TipoLog =>
  texto.startsWith("✔") ? "ok" : texto.startsWith("✖") ? "error" : "info";

// Colores por estado (clases completas para que Tailwind las detecte)
const ESTILOS_ETAPA: Record<Estado, string> = {
  pendiente: "border-bruma/25 text-bruma",
  corriendo: "border-cian bg-cian/5 text-cian shadow-glow-cian",
  ok: "border-cian/50 bg-cian/10 text-cian",
  fallo: "border-error bg-error/10 text-error",
  omitida: "border-bruma/15 text-bruma opacity-60",
};

const ESTILOS_LOG: Record<TipoLog, string> = {
  cmd: "text-perla",
  info: "text-bruma",
  ok: "text-cian",
  error: "text-error",
};

// Animaciones por estado: la etapa activa "late"; la fallida se sacude
const VARIANTES: Variants = {
  pendiente: { scale: 1, x: 0 },
  corriendo: { scale: [1, 1.03, 1], x: 0, transition: { duration: 1.2, repeat: Infinity } },
  ok: { scale: 1, x: 0 },
  fallo: { scale: 1, x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.45 } },
  omitida: { scale: 1, x: 0 },
};

function Icono({ estado }: { estado: Estado }) {
  const base = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (estado) {
    case "corriendo":
      return (
        <motion.svg
          {...base}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <path d="M21 12a9 9 0 1 1-6.2-8.55" />
        </motion.svg>
      );
    case "ok":
      return (
        <svg {...base}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "fallo":
      return (
        <svg {...base}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "omitida":
      return (
        <svg {...base}>
          <path d="M6 12h12" />
        </svg>
      );
    default:
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

function Etapa({
  nombre,
  herramienta,
  estado,
}: {
  nombre: string;
  herramienta: string;
  estado: Estado;
}) {
  return (
    <motion.li
      variants={VARIANTES}
      animate={estado}
      initial={false}
      className={`flex items-center gap-3 rounded-md border p-4 transition-colors md:flex-col md:items-start ${ESTILOS_ETAPA[estado]}`}
    >
      <Icono estado={estado} />
      <div>
        <p className="font-display font-bold text-perla">{nombre}</p>
        <p className="font-mono text-xs opacity-80">{herramienta}</p>
      </div>
    </motion.li>
  );
}

export default function PipelineDemo({ lang }: { lang: Lang }) {
  const t = demoTextos[lang];
  const reducir = useReducedMotion();

  const [nube, setNube] = useState<Nube>("azure");
  const [simularFallo, setSimularFallo] = useState(false);
  const [estados, setEstados] = useState<Estado[]>(() => ORDEN.map(() => "pendiente"));
  const [logs, setLogs] = useState<EntradaLog[]>([]);
  const [corriendo, setCorriendo] = useState(false);
  const [resultado, setResultado] = useState<Resultado>(null);

  const ejecucion = useRef(0); // identifica la ejecución vigente (para poder cancelar)
  const idLog = useRef(0);
  const panel = useRef<HTMLDivElement>(null);

  // Al desmontar, cancela cualquier ejecución en curso
  useEffect(() => {
    return () => {
      ejecucion.current++;
    };
  }, []);

  // Mantiene el log desplazado al final (solo dentro del panel, sin mover la página)
  useEffect(() => {
    panel.current?.scrollTo({ top: panel.current.scrollHeight });
  }, [logs]);

  const marcar = (i: number, estado: Estado) =>
    setEstados((prev) => prev.map((e, k) => (k === i ? estado : e)));
  const log = (texto: string, tipo: TipoLog = tipoDe(texto)) =>
    setLogs((prev) => [...prev, { id: idLog.current++, tipo, texto }]);
  const pausa = (ms: number) => esperar(reducir ? 0 : ms);

  const reiniciar = () => {
    ejecucion.current++;
    setEstados(ORDEN.map(() => "pendiente"));
    setLogs([]);
    setResultado(null);
    setCorriendo(false);
  };

  async function ejecutar() {
    reiniciar();
    const id = ejecucion.current;
    const vigente = () => ejecucion.current === id;
    setCorriendo(true);

    for (let i = 0; i < ORDEN.length; i++) {
      const etapa = ORDEN[i];
      marcar(i, "corriendo");

      await pausa(350);
      if (!vigente()) return;
      log(etapa === "deploy" ? COMANDOS.deploy[nube] : COMANDOS[etapa], "cmd");

      const lineas = etapa === "deploy" ? t.lineasDeploy[nube] : t.lineas[etapa];
      const falla = etapa === "test" && simularFallo;
      // Si la etapa falla, se omite el ✔ final y se muestran las líneas de error
      const aMostrar = falla ? lineas.slice(0, -1) : lineas;

      for (const linea of aMostrar) {
        await pausa(550);
        if (!vigente()) return;
        log(linea);
      }

      if (falla) {
        for (const linea of t.lineasFallo) {
          await pausa(450);
          if (!vigente()) return;
          log(linea);
        }
        marcar(i, "fallo");
        setEstados((prev) => prev.map((e, k) => (k > i ? "omitida" : e)));
        setResultado("fallo");
        setCorriendo(false);
        return;
      }

      marcar(i, "ok");
    }

    setResultado("ok");
    setCorriendo(false);
  }

  // Cambiar una opción después de una ejecución limpia el estado anterior
  const elegirNube = (n: Nube) => {
    setNube(n);
    reiniciar();
  };
  const alternarFallo = (valor: boolean) => {
    setSimularFallo(valor);
    reiniciar();
  };

  const completadas = estados.filter((e) => e === "ok").length;
  const nombreNube = nube === "azure" ? "Azure" : "AWS";

  return (
    <MotionConfig reducedMotion="user">
      <div>
        {/* Controles */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-bruma">{t.etiquetaNube}</span>
            <div
              role="group"
              aria-label={t.etiquetaNube}
              className="inline-flex rounded-full border border-bruma/30 bg-abismo/50 p-1 font-mono text-xs"
            >
              {(["azure", "aws"] as Nube[]).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={nube === n}
                  disabled={corriendo}
                  onClick={() => elegirNube(n)}
                  className={`rounded-full px-4 py-1.5 uppercase transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    nube === n
                      ? "bg-violeta text-perla shadow-glow-violeta"
                      : "text-bruma hover:text-cian"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-bruma">
            <input
              type="checkbox"
              role="switch"
              checked={simularFallo}
              disabled={corriendo}
              onChange={(e) => alternarFallo(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="relative h-6 w-11 rounded-full bg-bruma/30 transition peer-checked:bg-error peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cian peer-disabled:opacity-50 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-perla after:transition peer-checked:after:translate-x-5"
            />
            {t.etiquetaFallo}
          </label>

          <div className="flex gap-3 sm:ml-auto">
            {logs.length > 0 && !corriendo && (
              <button
                type="button"
                onClick={reiniciar}
                className="rounded-md border border-bruma/40 px-5 py-2.5 font-display font-medium text-bruma transition hover:border-cian hover:text-cian"
              >
                {t.reiniciar}
              </button>
            )}
            <button
              type="button"
              onClick={() => void ejecutar()}
              disabled={corriendo}
              className="inline-flex items-center gap-2 rounded-md bg-violeta px-5 py-2.5 font-display font-medium text-perla shadow-glow-violeta transition hover:shadow-glow-cian disabled:cursor-not-allowed disabled:opacity-60"
            >
              {corriendo ? t.ejecutando : t.ejecutar}
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-bruma/20" aria-hidden="true">
          <motion.div
            className={`h-full rounded-full ${
              resultado === "fallo" ? "bg-error" : "bg-linear-to-r from-cian to-neon"
            }`}
            initial={false}
            animate={{ width: `${(completadas / ORDEN.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Etapas */}
        <ol aria-label={t.ariaEtapas} className="mt-4 grid gap-3 md:grid-cols-5">
          {ORDEN.map((id, i) => (
            <Etapa
              key={id}
              nombre={t.etapas[id]}
              herramienta={id === "deploy" ? HERRAMIENTAS.deploy[nube] : HERRAMIENTAS[id]}
              estado={estados[i]}
            />
          ))}
        </ol>

        {/* Log */}
        <div
          ref={panel}
          role="log"
          aria-live="polite"
          aria-label={t.tituloLog}
          className="mt-4 h-64 overflow-y-auto rounded-md border border-cian/20 bg-abismo/80 p-4 font-mono text-[0.8rem] leading-relaxed sm:text-sm"
        >
          {logs.length === 0 && <p className="text-bruma/70">{t.inactivo}</p>}
          {logs.map((l) => (
            <motion.p
              key={l.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`whitespace-pre-wrap break-words ${ESTILOS_LOG[l.tipo]}`}
            >
              {l.tipo === "cmd" && <span className="mr-2 select-none text-neon">$</span>}
              {l.texto}
            </motion.p>
          ))}
        </div>

        {/* Resultado */}
        <div role="status" className="mt-4 min-h-7 font-display text-lg">
          {resultado === "ok" && (
            <p className="text-cian">✔ {t.exito.replace("{nube}", nombreNube)}</p>
          )}
          {resultado === "fallo" && <p className="text-error">✖ {t.falla}</p>}
        </div>

        <p className="mt-2 text-xs leading-relaxed text-bruma">{t.nota}</p>
      </div>
    </MotionConfig>
  );
}