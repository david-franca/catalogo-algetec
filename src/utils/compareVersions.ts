/**
 * Compares two versions and returns a value indicating their relationship.
 *
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @throws {Error} If the versions do not follow the expected pattern.
 * @return {number} A value indicating the relationship between the versions:
 *                  -1 if v1 is less than v2,
 *                   0 if v1 is equal to v2,
 *                   1 if v1 is greater than v2.
 */
export function compareVersions(v1: string, v2: string): number {
  const regex = /^[0-9]+(\.[0-9]+){0,3}$/;
  if (!regex.test(v1) || !regex.test(v2)) {
    throw new Error('As versões informadas não seguem o padrão esperado.');
  }
  const v1Array = v1.split('.').map(Number);
  const v2Array = v2.split('.').map(Number);
  const length = Math.max(v1Array.length, v2Array.length);

  for (let i = 0; i < length; i += 1) {
    const v1Part = v1Array[i] ?? 0;
    const v2Part = v2Array[i] ?? 0;

    if (v1Part > v2Part) {
      return 1;
    }
    if (v1Part < v2Part) {
      return -1;
    }
  }
  return 0;
}
