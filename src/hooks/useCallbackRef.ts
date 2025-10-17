import { DependencyList, useCallback, useEffect, useRef } from 'react';

/**
 * A hook that returns a memoized version of the provided callback function.
 *
 * @param callback - The callback function to be memoized.
 * @param {DependencyList} deps - An optional array of dependencies.
 * @return The memoized callback function.
 */
export function useCallbackRef<T extends (...args: unknown[]) => unknown>(
  callback: T | undefined,
  deps: DependencyList = [],
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps);
}
