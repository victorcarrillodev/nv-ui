# 🧩 NvUI — Vue 3 Component Library

![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)
![MIT License](https://img.shields.io/badge/license-MIT-green.svg)
![WIP](https://img.shields.io/badge/status-in%20progress-yellow.svg)

> ⚠️ **Work in progress** — NvUI está en desarrollo activo. Feedback y colaboraciones son bienvenidas.

---

## ✨ ¿Qué es NvUI?

**NvUI** es una **librería de componentes UI para Vue 3** altamente personalizable, pensada para aplicaciones modernas y escalables. Su objetivo es ofrecer una base sólida, tipada y adaptable a cualquier diseño, integrando conceptos como:

- 🧩 Componentes modulares con lógica aislada
- 📱 Props responsivas por breakpoint (`xs`, `sm`, `md`, `lg`, `xl`)
- 🎨 Temas centralizados (paleta, tipografía, sombras, etc.)
- 🌊 Efectos `ripple` personalizables
- ⚡ Generación dinámica de estilos y clases por componente

---

## 📦 Instalación

```bash
npm install nv-ui
# o
yarn add nv-ui
```
---
📁 Estructura de componentes
Cada componente sigue una arquitectura clara y escalable:

```
NvButton/
├── NvButton.vue                  # Componente principal
├── types.d.ts                   # Tipos fuertes y responsivos
├── useButtonStyles.ts           # Estilos dinámicos
├── useButtonClasses.ts          # Clases por variantes
├── useButtonGlobalStyles.ts     # Inyección global de estilos base
├── index.ts                     # Export central
└── test/
    └── Button.spec.ts           # Tests unitarios
```