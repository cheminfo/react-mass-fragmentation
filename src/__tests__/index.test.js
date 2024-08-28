import { test, expect } from 'vitest';

import { sequenceSVG } from '../sequenceSVG.tsx';

test('render: Molecule', () => {
  const sequence =
    '(Me)MQIFVKTLTGKT(OEt)IT(OMe)LEVEPSD(NH2)TIENVKAKIQD(NH2)KEGIPPDQQ(OMe)';

  const analysisResults = [
    { type: 'b38y33', similarity: 0.9012, charge: 3 },
    { type: 'b30y30', similarity: 0.8686, charge: 3 },
    { type: 'b40y40', similarity: 0.869, charge: 2 },
    { type: 'c1', similarity: 0.8919, charge: 3 },
    { type: 'c1', similarity: 0.9548, charge: 2 },
    { type: 'c5', similarity: 0.8764, charge: 2 },
    { type: 'x1', similarity: 0.8694, charge: 2 },
    { type: 'c28', similarity: 0.8463, charge: 2 },
    { type: 'c29', similarity: 0.8127, charge: 2 },
    { type: 'z28', similarity: 0.7976, charge: 2 },
    { type: 'c30', similarity: 0.7406, charge: 2 },
    { type: 'c27', similarity: 0.7157, charge: 2 },
    { type: 'c34', similarity: 0.6766, charge: 3 },
    { type: 'c17', similarity: 0.6617, charge: 2 },
    { type: 'z9', similarity: 0.6244, charge: 1 },
    { type: 'z9', similarity: 0.6164, charge: 2 },
    { type: 'z9', similarity: 0.5776, charge: 3 },
    { type: 'c38', similarity: 0.5044, charge: 2 },
  ];

  const options = {
    width: 700,
    leftRightBorders: 50,
    spaceBetweenResidues: 30,
    spaceBetweenInternalLines: 12,
    parsing: {
      kind: 'peptide',
    },
  };

  const svg = sequenceSVG(sequence, analysisResults, options);
  expect(svg).toHaveLength(13754);
  expect(svg).toMatchSnapshot();
});
