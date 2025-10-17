/**
 * Extracts the link name from a given string.
 *
 * @param {string} value - The input string.
 * @return {string} The extracted link name.
 */
export const handleLinkName = (value: string): string => {
  const index = value.split('').findIndex((e) => e === '@');

  return value.substring(index + 1);
};
