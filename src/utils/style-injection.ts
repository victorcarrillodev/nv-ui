import type { Properties as CSSProperties } from 'csstype';

type NestedStyles = {
  [K in `:${string}` | `@media ${string}`]?: StyleObject;
};

export type StyleObject = CSSProperties<string | number> & NestedStyles;

const STYLE_TAG_ID = '__dynamic_styles';

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function toCssString(selector: string, styles: StyleObject): string {
  const base = Object.entries(styles)
    .filter(([k]) => !k.startsWith(':') && !k.startsWith('@'))
    .map(([k, v]) => `${toKebabCase(k)}: ${v};`)
    .join(' ');

  let result = `${selector} { ${base} }`;

  for (const key in styles) {
    const value = styles[key as keyof StyleObject] as StyleObject;

    if (key.startsWith(':')) {
      const nested = Object.entries(value)
        .map(([k, v]) => `${toKebabCase(k)}: ${v};`)
        .join(' ');
      result += ` ${selector}${key} { ${nested} }`;
    }

    if (key.startsWith('@media')) {
      const nested = Object.entries(value)
        .map(([k, v]) => `${toKebabCase(k)}: ${v};`)
        .join(' ');
      result += ` ${key} { ${selector} { ${nested} } }`;
    }
  }

  return result;
}

const injected = new Set<string>();

export function injectStyles(selector: string, styles: StyleObject) {
  const key = selector + JSON.stringify(styles);
  if (injected.has(key)) return;
  injected.add(key);

  let styleEl = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_TAG_ID;
    document.head.appendChild(styleEl);
  }

  const css = toCssString(selector, styles);
  styleEl.innerHTML += css;
}
