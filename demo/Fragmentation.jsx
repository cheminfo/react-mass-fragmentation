import { v4 as uuid } from 'uuid';

import { MassFragmentation } from '../src/components/MassFragmentation';

/**
 * Demo wrapper that renders a `MassFragmentation` component inside a bordered div.
 * @param {object} props - Component props.
 * @param {string} props.sequence - Peptide or nucleotide sequence.
 * @param {import('../src/types.js').AnalysisResult[]} props.analysisResults - Raw analysis results.
 * @param {import('../src/types.js').SequenceSVGOptions} props.options - Rendering and parsing options.
 * @returns {import('react').JSX.Element} The wrapped mass fragmentation component.
 */
export default function Fragmentation({ sequence, analysisResults, options }) {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
      key={uuid()}
    >
      <MassFragmentation
        sequence={sequence}
        analysisResults={analysisResults}
        options={options}
        key={uuid()}
      />
    </div>
  );
}
