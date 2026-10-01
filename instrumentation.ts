/**
 * Next.js instrumentation hook — runs once in the server runtime before
 * the app boots. We use it to polyfill `localStorage` for Node environments
 * where a broken stub (e.g. from IDE tooling) causes SSR crashes.
 */
export async function register() {
  if (typeof globalThis.localStorage === "undefined" ||
      typeof globalThis.localStorage?.getItem !== "function") {
    // Minimal in-memory polyfill — safe for SSR (no persistence needed)
    const store: Record<string, string> = {};
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => { store[key] = String(value); },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
      key: (index: number) => Object.keys(store)[index] ?? null,
      get length() { return Object.keys(store).length; },
    };
  }
}
