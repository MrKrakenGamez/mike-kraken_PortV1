---
title: "Construyendo este portafolio: Astro, React y un kraken"
description: "Las decisiones técnicas detrás de este sitio: islas de Astro, un hero 3D que se carga solo cuando conviene y un CMS basado en Git."
pubDate: 2026-11-11
tags: ["Astro", "React", "Three.js"]
---

Este sitio es mi carta de presentación, así que quise construirlo como me gusta construir software: con decisiones explícitas.

## Astro como base

La mayor parte de las páginas es HTML estático. React solo aparece donde hay interactividad real: el hero 3D y el simulador de pipeline de la demo.

## Un 3D que se gana su lugar

Three.js pesa. Por eso el hero primero comprueba si el equipo puede con ello (sin `prefers-reduced-motion`, pantalla ancha, WebGL disponible). Si no, se queda una escena SVG estática.

```astro
<Hero3D client:only="react" />
```

## Contenido en Git

Los artículos son archivos Markdown dentro del repositorio y se editan desde un panel de Decap CMS. Sin base de datos y sin servidores que mantener.

Gracias por leer.