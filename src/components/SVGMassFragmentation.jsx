import { appendResidues } from '../appendResidues.js';
import { appendResults, sortResults } from '../appendResults.js';

import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceBreak } from './SVGSequenceBreak.jsx';

function initMassFragmentationData(sequence, analysisResults, options = {}) {
  const { parsing, merge, filter } = options;
  const data = {};
  appendResidues(data, sequence, parsing);
  appendResults(data, analysisResults, { merge, filter });
  console.log(data);
  sortResults(data);
  console.log(data);
  return data;
}

export function SVGMassFragmentation({ sequence, analysisInfo, options }) {
  const data = initMassFragmentationData(sequence, analysisInfo, options);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${options.width} ${options.height}`}
    >
      <SVGSequence sequence={data} options={options} />
      <SVGSequenceBreak breaks={data.results.break} options={options} />
    </svg>
  );
}
