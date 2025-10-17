/**
 * Calculates the hash value of a given string.
 *
 * @param {string} str - The input string.
 * @returns {number} The hash value of the input string.
 */
const getHashOfString = (str: string): number => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

/**
 * Normalizes a given hash value within a specified range.
 *
 * @param {number} hash - The hash value to be normalized.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {number} The normalized hash value within the specified range.
 */
const normalizeHash = (hash: number, min: number, max: number): number =>
  Math.floor((hash % (max - min)) + min);

/**
 * Generates an HSL color based on the given name, saturation range, and lightness range.
 *
 * @param {string} name - The name used to generate the color.
 * @param {number[]} saturationRange - The range of saturation values.
 * @param {number[]} lightnessRange - The range of lightness values.
 * @return {number[]} An array representing the HSL color.
 */
const generateHSL = (
  name: string,
  saturationRange: number[],
  lightnessRange: number[]
): number[] => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, 0, 360);
  const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
  const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
  return [h, s, l];
};

/**
 * Converts an array of HSL values to a string representation.
 *
 * @param {number[]} hsl - An array of HSL values.
 * @return {string} The string representation of the HSL values.
 */
const HSLtoString = (hsl: number[]): string =>
  `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

/**
 * Returns a unique color based on the given id.
 *
 * @param {string} id - The id used to generate the color.
 * @return {string} The unique color in HSL format.
 */
export const getUniqueColor = (id?: string): string =>
  id ? HSLtoString(generateHSL(id, [50, 100], [20, 40])) : "#ccc";
