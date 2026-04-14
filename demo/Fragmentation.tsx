import type { JSX } from 'react';
import { useState } from 'react';

import { MassFragmentation } from '../src/components/MassFragmentation.js';
import type { AnalysisResult, SequenceSVGOptions } from '../src/types.js';

import { Controls } from './Controls.js';

interface FragmentationProps {
  /** Peptide or nucleotide sequence. */
  sequence: string;
  /** Raw analysis results. */
  analysisResults: AnalysisResult[];
  /** Initial rendering and parsing options. */
  options: SequenceSVGOptions;
}

/**
 * Demo wrapper that renders a `MassFragmentation` component inside a bordered
 * div, with an interactive controls panel above the SVG so options can be
 * tweaked live.
 * @param props - Component props.
 * @param props.sequence - Peptide or nucleotide sequence.
 * @param props.analysisResults - Raw analysis results.
 * @param props.options - Initial rendering and parsing options.
 * @returns The wrapped mass fragmentation component with its controls.
 */
export default function Fragmentation({
  sequence,
  analysisResults,
  options: initialOptions,
}: FragmentationProps): JSX.Element {
  const [options, setOptions] = useState<SequenceSVGOptions>(initialOptions);
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 4,
        overflow: 'clip',
        marginBottom: 16,
      }}
    >
      <Controls options={options} onChange={setOptions} />
      <MassFragmentation
        sequence={sequence}
        analysisResults={analysisResults}
        options={options}
      />
    </div>
  );
}
