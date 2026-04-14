import type { JSX } from 'react';

import { MassFragmentation } from '../src/components/MassFragmentation.js';
import type { AnalysisResult, SequenceSVGOptions } from '../src/types.js';

interface FragmentationProps {
  /** Peptide or nucleotide sequence. */
  sequence: string;
  /** Raw analysis results. */
  analysisResults: AnalysisResult[];
  /** Rendering and parsing options. */
  options: SequenceSVGOptions;
}

/**
 * Demo wrapper that renders a `MassFragmentation` component inside a bordered div.
 * @param props - Component props.
 * @param props.sequence - Peptide or nucleotide sequence.
 * @param props.analysisResults - Raw analysis results.
 * @param props.options - Rendering and parsing options.
 * @returns The wrapped mass fragmentation component.
 */
export default function Fragmentation({
  sequence,
  analysisResults,
  options,
}: FragmentationProps): JSX.Element {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
    >
      <MassFragmentation
        sequence={sequence}
        analysisResults={analysisResults}
        options={options}
      />
    </div>
  );
}
