// Try cast environment variables to a wider type.
type FallbackType = string | number | boolean | null | undefined;

// Cast to a wider type. For example 3000 -> number, "true" -> boolean, etc.
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T;

export function getServerEnv<T extends FallbackType>(
  key: string,
  fallback: T,
): Widen<T>;

export function getServerEnv(key: string): FallbackType;

/**
 * Get environment variable for server side or fallback to a default value.
 * In app use `import.meta.env` to access environment variables.
 */
export function getServerEnv<T extends FallbackType>(
  key: string,
  fallback?: T,
): Widen<T> | FallbackType {
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    key in import.meta.env
  ) {
    return import.meta.env[key] ?? fallback;
  }
  // @ts-ignore: Deno only
  if (typeof Deno !== "undefined" && Deno.env) {
    try {
      // @ts-ignore: Deno only
      return JSON.parse(Deno.env.get(key) ?? JSON.stringify(fallback));
    } catch (_error) {
      // @ts-ignore: Deno only
      return Deno.env.get(key) ?? fallback;
    }
  }
  return fallback as Widen<T>;
}
