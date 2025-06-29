let injected = false;

export function useButtonGlobalStyles(): void {
  if (injected) return;
  injected = true;

  const css = `
/* === NvButton global base styles === */
.NvButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.NvButton--loading {
  pointer-events: none;
}
.NvButton__start-icon,
.NvButton__end-icon,
.NvButton__center-loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  line-height: 1;
}
.NvButton__start-icon {
  margin-right: 0.5em;
}
.NvButton__end-icon {
  margin-left: 0.5em;
}

/* === Ripple base === */
.NvButton__ripple {
  position: absolute;
  border-radius: 50%;
  background-color: var(--ripple-color);
  transform: scale(0);
  animation: ripple-animation var(--ripple-duration) linear forwards;
  width: var(--ripple-size);
  height: var(--ripple-size);
  left: var(--ripple-x);
  top: var(--ripple-y);
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

/* === Keyframes === */
@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

  const style = document.createElement('style');
  style.setAttribute('data-nvbutton-styles', 'true');
  style.textContent = css;
  document.head.appendChild(style);
}
