import React from 'react';
import { createRoot } from 'react-dom/client';
import { v4 as uuid } from 'uuid';

import Fragmentation from './Fragmentation';
import { bigNucleotide } from './data/bigNucleotide';
import { nucleotide } from './data/nucleotide';
import { peptide } from './data/peptide';

const root = createRoot(document.querySelector('#root'));
root.render(
  <>
    <h2>Peptide</h2>
    <Fragmentation
      sequence={peptide.sequence}
      analysisResults={peptide.analysisResults}
      options={peptide.options}
      key={uuid()}
    />
    <h2>Nucléotide</h2>
    <Fragmentation
      sequence={nucleotide.sequence}
      analysisResults={nucleotide.analysisResults}
      options={nucleotide.options}
      key={uuid()}
    />
    <h2>Big Nucleotide</h2>
    <Fragmentation
      sequence={bigNucleotide.sequence}
      analysisResults={bigNucleotide.analysisResults}
      options={bigNucleotide.options}
      key={uuid()}
    />
  </>,
);
