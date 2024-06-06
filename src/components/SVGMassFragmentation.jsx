import { appendResidues } from '../appendResidues.js';
import { appendResults, processResults } from '../appendResults.js';

import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceBreak } from './SVGSequenceBreak.jsx';

const options = {
  width: 1400,
  leftRightBorders: 10,
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

export function initMassFragmentationData(
  sequence,
  analysisResults,
  options = {},
) {
  const { parsing, merge, filter } = options;
  const data = {};
  appendResidues(data, sequence, parsing);
  appendResults(data, analysisResults, { merge, filter });
  processResults(data);
  console.log(data);
  return data;
}

export function SVGMassFragmentation() {
  const svgSize = {
    width: 1400,
    height: 500,
  };
  const data = initMassFragmentationData(sequence, info, options);
  console.log(data);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${options.width} ${svgSize.height}`}
    >
      <SVGSequence sequence={data} options={options} />
      <SVGSequenceBreak breaks={data.results.break} options={options} />
    </svg>
  );
}
