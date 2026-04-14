import { appendLines } from './appendLines.js';
import { appendResidues } from './appendResidues.js';
import { appendResults, sortResults } from './appendResults.js';
import type {
  AnalysisResult,
  MassFragmentationData,
  ResolvedOptions,
} from './types.js';

/**
 * Build the full data model consumed by the React components: residues, grouped
 * results and pre-computed line layout.
 * @param sequence - Peptide or nucleotide sequence.
 * @param analysisResults - Raw analysis results.
 * @param options - Options with all defaults already applied.
 * @returns The data model ready to be rendered.
 */
export function initMassFragmentationData(
  sequence: string,
  analysisResults: AnalysisResult[],
  options: ResolvedOptions,
): MassFragmentationData {
  const {
    parsing,
    merge,
    filter,
    width,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
  } = options;
  const data = {} as MassFragmentationData;
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
