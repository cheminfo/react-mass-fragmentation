import { appendLines } from '../appendLines.js';
import { appendResidues } from '../appendResidues.js';
import { appendResults, sortResults } from '../appendResults.js';
import { generateReactKey } from '../generateReactKey.js';

import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceBreak } from './SVGSequenceBreak.jsx';

function initMassFragmentationData(sequence, analysisResults, options = {}) {
  const { parsing, merge, filter } = options;
  const data = {};
  appendResidues(data, sequence, parsing);
  appendResults(data, analysisResults, { merge, filter });
  sortResults(data);
  appendLines(data, options);
  console.log(data);
  return data;
}

export function SVGMassFragmentation({ sequence, analysisInfo, options }) {
  const data = initMassFragmentationData(sequence, analysisInfo, options);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${options.width} ${data.height}`}
    >
      {data.lines.map((line, index) => (
        <>
          <SVGSequence
            sequence={line.residues}
            y={line.y}
            options={options}
            key={generateReactKey(`SVGLine-${index}`)}
          />
          <SVGSequenceBreak
            breaks={line.break}
            firstIndexOnLine={line.from}
            y={line.y}
            options={options}
            key={generateReactKey(`sequenceBreak-${index}`)}
          />
        </>
      ))}
    </svg>
  );
}
