export type StableDomainResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data: undefined;
      errorName: string;
    };

/**
 * Converte uma operação assíncrona em resultado controlado.
 *
 * Use em bordas públicas quando a UI precisa aplicar fallback em vez de deixar
 * exceções atravessarem a rota.
 */
export function toStable<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<StableDomainResult<TResult>> {
  return async (...args: TArgs): Promise<StableDomainResult<TResult>> => {
    try {
      return {
        success: true,
        data: await fn(...args),
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        errorName: error instanceof Error ? error.name : typeof error,
      };
    }
  };
}
