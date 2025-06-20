import { computed } from 'vue';
import type { ButtonProps } from './types';
import { generateMuiStyleClasses } from '@/utils/class-utils';
import { hashObject } from '@/utils/hash-utils';

/**
 * Genera clases tipo Material UI + hash único para estilos dinámicos
 */
export const useButtonClass = (props: ButtonProps) => {
  return computed(() => {
    const base = 'NvButton';

    // 1. Genera clases estilo MUI (NvButton-colorPrimary, etc.)
    const muiClasses = generateMuiStyleClasses(base, { ...props });

    // 2. Agrega clase única basada en hash
    const hash = hashObject(props);
    const hashedClass = `${base}--${hash}`;

    return [...muiClasses, hashedClass];
  });
};
