```
src/
├── components/           # Implementaciones internas de cada componente
│   ├── Button/
│   │   ├── NvButton.vue
│   │   ├── button.d.ts
│   │   ├── useButtonClasses.ts
│   │   ├── useButtonStyles.ts
│   │   └── index.ts          # exportación local interna
│   └── __tests__/
│       └── Button.spec.ts
│
├── ui/                  # Punto de entrada público de cada componente
│   ├── Button/
│   │   └── index.ts      # export { default as NvButton } from '@/components/Button'
│   └── index.ts          # export * from './Button' (etc)
│
├── theme/               # Sistema de theming completo
│   ├── composables/
│   │   ├── useTheme/
│   │   │   ├── index.ts
│   │   │   └── types.d.ts
│   │   └── useDynamicStyles/
│   │       ├── index.ts
│   │       └── types.d.ts
│   ├── constants/
│   │   └── theme-keys.ts
│   ├── factories/
│   │   └── createTheme.ts
│   ├── providers/
│   │   └── ThemeProvider.vue
│   ├── themes/
│   │   └── main/
│   │       ├── darkTheme.ts
│   │       ├── lightTheme.ts
│   │       └── theme.ts
│   └── types/
│       └── theme.d.ts
│
├── composables/         # Composables generales (no exclusivos de tema)
│   ├── useFocusRing.ts
│   ├── useBreakpoint.ts
│   └── useClickOutside.ts
│
├── styles/              # Variables CSS, helpers, etc.
│   ├── base.css
│   └── theme.css
│
├── App.vue              # Demo o playground interno
├── index.ts             # API pública del framework (para exportar todo)
├── main.ts              # Solo si estás construyendo una app demo
└── env.d.ts

```