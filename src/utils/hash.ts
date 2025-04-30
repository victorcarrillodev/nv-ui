/**
 * Genera un hash corto y determinista desde un string.
 * Útil para generar nombres únicos de clases CSS, etc.
 *
 * @param input - Cadena a ser hasheada
 * @returns String de 6 caracteres base36
 */
export function hashString(input: string): string {
  let hash = 0;

  if (!input) return '0';

  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }

  // Asegura valor positivo y convierte a base36
  return Math.abs(hash).toString(36).padStart(6, '0').slice(0, 6);
}

//? ---------------------------------------------------
// export function hashObject(input: unknown): string {
//   try {
//     const str = JSON.stringify(input)
//     return hashString(str)
//   } catch {
//     return '0'
//   }
// }
