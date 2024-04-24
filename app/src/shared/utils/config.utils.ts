export function env(key: string) {
  const window = globalThis.window as typeof globalThis.window & { envs: Record<string, string> };

  function expect(message: string) {
    // if no key
    if (!window.envs || !(key in window.envs)) throw new Error(message ?? `Missing env key ${key}`);

    const value = String(window.envs[key]);

    if (!value.trim()) throw new Error(message ?? `Required env key ${key} is empty`);

    return value.trim();
  }

  return { expect, value: window.envs ? window.envs[key] : undefined };
}
