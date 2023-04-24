import { Dimensions } from 'react-native';

/**
 * Truncate a given title string based on the screen width
 * and the given maximum length ratio.
 * The resulting truncated title will not end with a space or a comma.
 * @param {string} title - The title string to be truncated.
 * @param {number} [maxLengthRatio=0.09] - The ratio of the
 * screen width to be used for the maximum length of the title.
 * @returns {string} - The truncated title string.
 */
export const truncateTitle = (title: string, maxLengthRatio = 0.09): string => {
  const screenWidth = Dimensions.get('window').width;
  const maxLength = Math.floor(screenWidth * maxLengthRatio);

  if (title.length <= maxLength) {
    return title;
  }

  let truncatedTitle = title.slice(0, maxLength);
  while (
    truncatedTitle.length > 0 &&
    (truncatedTitle.endsWith(' ') || truncatedTitle.endsWith(','))
  ) {
    truncatedTitle = truncatedTitle.slice(0, -1);
  }

  return `${truncatedTitle}...`;
};

export default truncateTitle;
