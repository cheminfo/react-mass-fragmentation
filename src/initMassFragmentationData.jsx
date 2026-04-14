import { appendLines } from './appendLines.js';
import { appendResidues } from './appendResidues.js';
import { appendResults, sortResults } from './appendResults.js';

/**
 * @typedef {import('./types.js').AnalysisResult} AnalysisResult
 * @typedef {import('./types.js').ResolvedOptions} ResolvedOptions
 * @typedef {import('./types.js').MassFragmentationData} MassFragmentationData
 */

/**
 * Build the full data model consumed by the React components: residues, grouped
 * results and pre-computed line layout.
 * @param {string} sequence - Peptide or nucleotide sequence.
 * @param {AnalysisResult[]} analysisResults - Raw analysis results.
 * @param {ResolvedOptions} options - Options with all defaults already applied.
 * @returns {MassFragmentationData} The data model ready to be rendered.
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
  const data = /** @type {MassFragmentationData} */ ({});
  appendResidues(data, sequence, parsing);
  appendResults(data, analysisResults, { merge, filter });
  sortResults(data);
  appendLines(data, {
    width,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
  });
  return data;
}
