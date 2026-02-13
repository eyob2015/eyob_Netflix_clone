/**
 * String Utility Functions
 */

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length of the string
 * @returns {string} Truncated string with ellipsis if necessary
 */
export const truncateString = (str, length) => {
  if (!str) return str;
  return str.length > length ? str.substr(0, length - 1) + "..." : str;
};

const stringUtils = {
  truncateString,
};

export default stringUtils;
