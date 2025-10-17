/**
 * Returns the initials of a given name.
 *
 * @param {string | undefined} name - The name to extract initials from.
 * @return {string} The initials of the name.
 */
export const getInitials = (name?: string): string => {
  if (!name) {
    return "";
  }
  const initials = name.toUpperCase().split(" ");
  if (initials.length === 1) {
    return initials[0][0];
  }
  if (initials.length > 1) {
    return `${initials[0].charAt(0)}${initials.pop()?.charAt(0)}`;
  }
  return name.toUpperCase().charAt(0);
};
