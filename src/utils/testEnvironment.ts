const isLocal =
  window.location.href.includes("localhost") ??
  window.location.href.includes("127.0.0.1");

const isDev = import.meta.env.DEV;

/**
 * Returns the environment based on the values of the `isLocal` and `isDev` variables.
 *
 * @return {string} The environment. Possible values are 'local', 'development', or 'production'.
 */
export const testEnvironment = (): string => {
  if (isLocal) {
    return "local";
  }
  if (isDev) {
    return "development";
  }
  return "production";
};
