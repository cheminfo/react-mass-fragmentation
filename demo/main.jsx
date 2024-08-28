import React from 'react';
import { createRoot } from 'react-dom/client';
import { v4 as uuid } from 'uuid';

import Fragmentation from './Fragmentation';
import { nucleotide } from './data/nucleotide';
import { peptide } from './data/peptide';
import { bigNucleotide } from './data/bigNucleotide';

const root = createRoot(document.querySelector('#root'));
root.render(
  <>
    <h2>Peptide</h2>
    <Fragmentation
      sequence={peptide.sequence}
      analysisInfo={peptide.analysisInfo}
      options={peptide.options}
      key={uuid()}
    />
    <h2>Nucléotide</h2>
    <Fragmentation
      sequence={nucleotide.sequence}
      analysisInfo={nucleotide.analysisInfo}
      options={nucleotide.options}
      key={uuid()}
    />
    <h2>Big Nucleotide</h2>
    <Fragmentation
      sequence={bigNucleotide.sequence}
      analysisInfo={bigNucleotide.analysisInfo}
      options={bigNucleotide.options}
      key={uuid()}
    />
  </>,
);
