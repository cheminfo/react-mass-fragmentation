import React from 'react';
import { createRoot } from 'react-dom/client';

import Fragmentation from './Fragmentation';
import { nucleotide } from './data/nucleotide';
import { peptide } from './data/peptide';

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <h2>Peptide</h2>
    <Fragmentation
      sequence={peptide.sequence}
      analysisInfo={peptide.analysisInfo}
      options={peptide.options}
    />
    <h2>Nucléotide</h2>
    <Fragmentation
      sequence={nucleotide.sequence}
      analysisInfo={nucleotide.analysisInfo}
      options={nucleotide.options}
    />
  </>,
);
