import type { Lang } from "../i18n/ui";

export type IdEtapa = "checkout" | "build" | "test" | "image" | "deploy";
export type Nube = "azure" | "aws";

export const ORDEN: IdEtapa[] = ["checkout", "build", "test", "image", "deploy"];

// Comandos mostrados en el log (genéricos y simulados: no se ejecuta nada)
export const COMANDOS = {
  checkout: "git checkout main && git pull",
  build: "dotnet build -c Release",
  test: "dotnet test",
  image: "docker build -t app:latest .",
  deploy: {
    azure:
      "az webapp config container set --name app-demo --resource-group rg-demo --container-image-name app:latest",
    aws: "aws ecs update-service --cluster demo --service app --force-new-deployment",
  },
};

// Etiqueta corta de herramienta bajo el nombre de cada etapa
export const HERRAMIENTAS = {
  checkout: "git",
  build: "dotnet",
  test: "dotnet test",
  image: "docker",
  deploy: { azure: "Azure", aws: "AWS" },
};

export interface DemoTextos {
  ejecutar: string;
  ejecutando: string;
  reiniciar: string;
  etiquetaNube: string;
  etiquetaFallo: string;
  ariaEtapas: string;
  tituloLog: string;
  inactivo: string;
  exito: string; // {nube} se reemplaza por Azure / AWS
  falla: string;
  nota: string;
  etapas: Record<IdEtapa, string>;
  // Líneas del log por etapa. La última de cada etapa empieza con ✔ (se omite si esa etapa falla).
  lineas: Record<Exclude<IdEtapa, "deploy">, string[]>;
  lineasDeploy: Record<Nube, string[]>;
  lineasFallo: string[];
}

export const demoTextos: Record<Lang, DemoTextos> = {
  es: {
    ejecutar: "Ejecutar pipeline",
    ejecutando: "Ejecutando…",
    reiniciar: "Reiniciar",
    etiquetaNube: "Nube de destino",
    etiquetaFallo: "Romper una prueba a propósito",
    ariaEtapas: "Etapas del pipeline",
    tituloLog: "Salida del pipeline",
    inactivo: "Pulsa «Ejecutar pipeline» para empezar.",
    exito: "Desplegado en {nube}.",
    falla: "Pipeline detenido en Pruebas. Producción no cambió.",
    nota: "Simulación en el navegador (React + Motion). No ejecuta nada real: ilustra un pipeline CI/CD donde, sin pruebas en verde, no hay despliegue.",
    etapas: {
      checkout: "Código",
      build: "Build",
      test: "Pruebas",
      image: "Imagen",
      deploy: "Despliegue",
    },
    lineas: {
      checkout: ["Clonando el repositorio…", "Rama main actualizada", "✔ Código listo"],
      build: ["Restaurando paquetes…", "Compilando en modo Release…", "✔ Compilación correcta"],
      test: [
        "Ejecutando pruebas unitarias…",
        "Ejecutando pruebas del frontend…",
        "✔ Todas las pruebas pasaron",
      ],
      image: [
        "Construyendo la imagen del contenedor…",
        "Publicando en el registro…",
        "✔ Imagen publicada",
      ],
    },
    lineasDeploy: {
      azure: [
        "Autenticando en Azure…",
        "Actualizando el contenedor del servicio…",
        "Comprobando la salud del servicio…",
        "✔ Despliegue completado en Azure",
      ],
      aws: [
        "Autenticando en AWS…",
        "Forzando un nuevo despliegue en ECS…",
        "Comprobando la salud del servicio…",
        "✔ Despliegue completado en AWS",
      ],
    },
    lineasFallo: [
      "✖ 1 prueba falló: OrderService_RechazaTotalNegativo",
      "✖ Pipeline detenido: sin pruebas en verde no se despliega.",
      "Producción sigue en la versión anterior.",
    ],
  },
  en: {
    ejecutar: "Run pipeline",
    ejecutando: "Running…",
    reiniciar: "Reset",
    etiquetaNube: "Target cloud",
    etiquetaFallo: "Break a test on purpose",
    ariaEtapas: "Pipeline stages",
    tituloLog: "Pipeline output",
    inactivo: "Press “Run pipeline” to start.",
    exito: "Deployed to {nube}.",
    falla: "Pipeline stopped at Tests. Production is unchanged.",
    nota: "Browser simulation (React + Motion). It runs nothing real: it illustrates a CI/CD pipeline where, without green tests, nothing gets deployed.",
    etapas: {
      checkout: "Checkout",
      build: "Build",
      test: "Tests",
      image: "Image",
      deploy: "Deploy",
    },
    lineas: {
      checkout: ["Cloning the repository…", "Branch main up to date", "✔ Code ready"],
      build: ["Restoring packages…", "Compiling in Release mode…", "✔ Build succeeded"],
      test: ["Running unit tests…", "Running frontend tests…", "✔ All tests passed"],
      image: [
        "Building the container image…",
        "Pushing to the registry…",
        "✔ Image published",
      ],
    },
    lineasDeploy: {
      azure: [
        "Signing in to Azure…",
        "Updating the service container…",
        "Checking service health…",
        "✔ Deployment completed on Azure",
      ],
      aws: [
        "Signing in to AWS…",
        "Forcing a new deployment on ECS…",
        "Checking service health…",
        "✔ Deployment completed on AWS",
      ],
    },
    lineasFallo: [
      "✖ 1 test failed: OrderService_RejectsNegativeTotal",
      "✖ Pipeline stopped: no green tests, no deployment.",
      "Production remains on the previous version.",
    ],
  },
};