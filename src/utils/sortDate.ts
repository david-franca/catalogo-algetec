import dayjs from 'dayjs';

/**
 * Sorts two strings by date.
 *
 * @param {string} a - The first string to compare.
 * @param {string} b - The second string to compare.
 * @return {number} Returns a positive number if `a` is greater than `b`, a negative number if `a` is less than `b`, and 0 if they are equal.
 */
export function sortByDate(a: string, b: string): number {
  const dayA = dayjs(a).valueOf();
  const dayB = dayjs(b).valueOf();

  if (dayA > dayB) {
    return 1;
  }
  if (dayA < dayB) {
    return -1;
  }
  return 0;
}
