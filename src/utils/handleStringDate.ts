import dayjs from "dayjs";

/**
 * Handles a string representation of a date and formats it according to the specified format.
 *
 * @param {string} date - The string representation of the date.
 * @param {string} format - The format to use for formatting the date. If not provided, the default format 'L' will be used.
 * @return {string | null} - The formatted date string, or null if the date is not provided.
 */
export function handleStringDate(
  date?: string,
  format?: string
): string | null {
  if (!date) return null;
  return dayjs(date).format(format ?? "L");
}
