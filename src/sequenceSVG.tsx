import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { MassFragmentation } from './components/MassFragmentation.js';
import type { AnalysisResult, SequenceSVGOptions } from './types.js';

export type { SequenceSVGOptions } from './types.js';

/**
 * Render a sequence with its fragmentation results to an SVG string.
 * @param sequence - Peptide or nucleotide sequence.
 * @param analysisResults - Raw analysis results to display on the sequence.
 * @param options - Rendering and parsing options.
 * @returns The SVG markup as a string.
 */
export function sequenceSVG(
  sequence: string,
  analysisResults: AnalysisResult[],
  options: SequenceSVGOptions = {},
): string {
  const element = (
    <MassFragmentation
      sequence={sequence}
      analysisResults={analysisResults}
      options={options}
    />
  );
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(element);
  });
  return div.innerHTML;
}
