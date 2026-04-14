import { createRoot } from 'react-dom/client';

import Fragmentation from './Fragmentation.js';
import { bigNucleotide } from './data/bigNucleotide.js';
import { nucleotide } from './data/nucleotide.js';
import { peptide } from './data/peptide.js';

const container = document.querySelector('#root');
if (!container) {
  throw new Error('#root element not found');
}
const root = createRoot(container);
root.render(
  <>
    <h2>Peptide</h2>
    <Fragmentation
      sequence={peptide.sequence}
      analysisResults={peptide.analysisResults}
      options={peptide.options}
    />
    <h2>Nucléotide</h2>
    <Fragmentation
      sequence={nucleotide.sequence}
      analysisResults={nucleotide.analysisResults}
      options={nucleotide.options}
    />
    <h2>Big Nucleotide</h2>
    <Fragmentation
      sequence={bigNucleotide.sequence}
      analysisResults={bigNucleotide.analysisResults}
      options={bigNucleotide.options}
    />
  </>,
);
