import { appendResidues } from '../appendResidues.js';
import { appendResults } from '../appendResults.js';

import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceElement } from './SVGSequenceElement.jsx';

const options = {
  width: 600,
  leftRightBorders: 50,
  spaceBetweenResidues: 20,
  spaceBetweenInternalLines: 10,
  parsing: {
    kind: 'peptide',
  },
};

const sequence =
  '(Me)MQIFVKTLTGKT(OEt)IT(OMe)LEVEPSD(NH2)TIENVKAKIQD(NH2)KEGIPPDQQ(OMe)';

const info = [
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

export function SVGMassFragmentation() {
  const svgSize = {
    width: 1400,
    height: 500,
  };
  const data = {};
  appendResidues(data, sequence, options.parsing);
  console.log(data);
  appendResults(data, info);
  console.log(data);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
    >
      <SVGSequence sequence={sequence} parsing={options.parsing} />
    </svg>
  );
}
