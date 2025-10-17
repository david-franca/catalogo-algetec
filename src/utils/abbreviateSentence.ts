/**
 * Abbreviates a sentence by removing prepositions and returning the capitalized initials of each word.
 *
 * @param {string} str - The sentence to be abbreviated.
 * @returns {string} The abbreviated sentence.
 */ export const abbreviateSentence = (str: string | undefined): string => {
  if (!str) return '';
  const prepositions = ['a', 'com', 'de', 'do', 'dos', 'em', 'na', 'nas', 'no', 'nos', 'da', 'das'];

  return str
    .toLowerCase()
    .split(' ')
    .filter((el) => !prepositions.includes(el))
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};
