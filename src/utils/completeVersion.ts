/**
 * Generates a complete version string by adding missing parts to the input version string.
 *
 * @param {string | undefined} version - The input version string.
 * @return {string} - The complete version string with all parts filled in.
 */
export function completeVersion(version: string | undefined): string {
  if (version) {
    const vArray = version.split('.').map(Number);

    while (vArray.length < 4) {
      vArray.push(0);
    }

    return vArray.join('.');
  }
  return '—';
}
