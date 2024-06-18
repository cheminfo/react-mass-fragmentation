import React from 'react';
import { createRoot } from 'react-dom/client';

import { appendLines } from '../appendLines.js';
import { appendResidues } from '../appendResidues.js';
import { appendResults, sortResults } from '../appendResults.js';
import { generateReactKey } from '../generateReactKey.js';

import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceBreak } from './SVGSequenceBreak.jsx';
import { SVGSequenceFragments } from './SVGSequenceFragments.jsx';

function maxSequenceBreakAbove(breaks) {
  let max = 0;
  for (let b of breaks) {
    if (b.members.length > max) max = b.members.length;
  }
  return max;
}

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
  const {
    width = 600,
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
    labelFontFamily = 'Verdana',
    labelSize = 8,
    parsing,
    merge,
    filter,
  } = options;
  const data = initMassFragmentationData(sequence, analysisInfo, options);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${options.width} ${data.height}`}
      key={`SVG-${generateReactKey('')}`}
    >
      {data.lines.map((line, index) => (
        <React.Fragment key={`SVGLine-${index}`}>
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
          <SVGSequenceFragments
            fragments={line.fragments}
            firstIndexOnLine={line.from}
            y={
              line.y -
              (maxSequenceBreakAbove(line.break.filter((b) => b.fromEnd)) + 1) *
                spaceBetweenInternalLines
            }
            options={options}
            key={`SVGFragments-${index}`}
          />
        </React.Fragment>
      ))}
    </svg>
  );
}
