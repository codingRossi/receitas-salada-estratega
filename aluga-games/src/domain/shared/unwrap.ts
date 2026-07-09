/**
 * Extrai o dado de um resultado estável ou retorna fallback explícito.
 */
export function unwrap<T>(
  stableResult: { success: boolean; data: T | undefined },
  fallback: T,
): T {
  return stableResult.success && stableResult.data !== undefined
    ? stableResult.data
    : fallback;
}
