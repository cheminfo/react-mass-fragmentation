import { appendLines } from './appendLines.js';
import { appendResidues } from './appendResidues.js';
import { appendResults, sortResults } from './appendResults.js';

/**
 *
 * @param {string} sequence
 * @param {Array} analysisResults
 * @param {object} options
 * @param {object} options.parsing
 * @param {object} options.merge
 * @param {object} options.filter
 * @param {number} options.width
 * @param {number} options.leftRightBorders
 * @param {number} options.spaceBetweenResidues
 * @param {number} options.spaceBetweenInternalLines
 * @returns
 */
export function initMassFragmentationData(sequence, analysisResults, options) {
  const {
    parsing,
    merge,
    filter,
    width,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
  } = options;
  const data = {};
  appendResidues(data, sequence, parsing);
  appendResults(data, analysisResults, { merge, filter });
  sortResults(data);
  appendLines(data, {
    width,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
  });
  // console.log(data);
  return data;
}
