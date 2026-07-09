export type Logger = {
  info?: (...args: unknown[]) => void;
  error?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
};

type WithLogOptions =
  | string
  | {
      logger?: Logger;
      name?: string;
    };

function resolveOptions(options?: WithLogOptions) {
  if (typeof options === "string") {
    return {
      logger: console,
      name: options,
    };
  }

  return {
    logger: options?.logger ?? console,
    name: options?.name ?? "domain-feature",
  };
}

function getErrorName(error: unknown) {
  return error instanceof Error ? error.name : typeof error;
}

/**
 * Envolve uma operação de domínio com logs técnicos sem expor argumentos ou
 * payloads completos. Mantém apenas nome da operação, duração e tipo do erro.
 */
export function withLog<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options?: WithLogOptions,
): (...args: TArgs) => Promise<TResult> {
  const { logger, name } = resolveOptions(options);

  return async (...args: TArgs): Promise<TResult> => {
    const startedAt = Date.now();

    logger.debug?.("[domain]", name, "started");

    try {
      const operationResult = await fn(...args);
      logger.info?.("[domain]", name, "success", {
        durationMs: Date.now() - startedAt,
      });

      return operationResult;
    } catch (error) {
      logger.error?.("[domain]", name, "error", {
        durationMs: Date.now() - startedAt,
        errorName: getErrorName(error),
      });

      throw error;
    }
  };
}
