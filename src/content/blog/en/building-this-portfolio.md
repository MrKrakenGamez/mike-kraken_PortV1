---
title: "Building this portfolio: Astro, React and a kraken"
description: "The technical decisions behind this site: Astro islands, a 3D hero that loads only when it makes sense, and a Git-based CMS."
pubDate: 2026-11-11
tags: ["Astro", "React", "Three.js"]
---

This site is my business card, so I wanted to build it the way I like to build software: with explicit decisions.

## Astro as the foundation

Most pages are static HTML. React only shows up where there is real interactivity: the 3D hero and the pipeline simulator in the demo.

## A 3D scene that earns its place

Three.js is heavy. That's why the hero first checks whether the device can handle it (no `prefers-reduced-motion`, a wide screen, WebGL available). If not, a static SVG scene stays in place.

```astro
<Hero3D client:only="react" />
```

## Content in Git

Articles are Markdown files inside the repository, edited from a Decap CMS panel. No database and no servers to maintain.

Thanks for reading.