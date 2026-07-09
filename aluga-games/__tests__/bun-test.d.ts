declare module "bun:test" {
  type TestCallback = () => unknown | Promise<unknown>;

  type Matchers<TValue> = {
    not: Matchers<TValue>;
    resolves: Matchers<Awaited<TValue>>;
    toBe: (expected: unknown) => void;
    toBeDefined: () => void;
    toEqual: (expected: unknown) => void;
    toHaveLength: (expected: number) => void;
    toBeNull: () => void;
    toContain: (expected: unknown) => void;
  };

  type TestDeclaration = {
    (name: string, callback: TestCallback): void;
    skip: (name: string, callback: TestCallback) => void;
  };

  export const describe: TestDeclaration;
  export function expect<TValue>(value: TValue): Matchers<TValue>;
  export const it: TestDeclaration;
  export const mock: {
    module: (name: string, factory: () => unknown) => void;
  };
}
