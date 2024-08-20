import React from 'react';

import { appendLines } from '../appendLines.js';
import { appendResidues } from '../appendResidues.js';
import { appendResults, sortResults } from '../appendResults.js';
import { generateReactKey } from '../generateReactKey.js';

import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceBreak } from './SVGSequenceBreak.jsx';
import { SVGSequenceFragments } from './SVGSequenceFragments.jsx';

function maxSequenceBreakAbove(internals) {
  let max = 0;
  for (let b of internals) {
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
  return data;
}

export function SVGMassFragmentation({ sequence, analysisInfo, options }) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
    labelFontFamily = 'Verdana',
    labelSize = 12,
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
          <g
            transform={`translate(0 ${line.y})`}
            fontFamily={labelFontFamily}
            fontWeight="bold"
            key={`group-SVGMassFragmentationLine-${index}`}
          >
            <g fontSize={12} key={`group-SVGSequence-${index}`}>
              <SVGSequence
                sequence={line.residues}
                options={options}
                key={generateReactKey(`SVGLine-${index}`)}
              />
            </g>
            <g
              fontSize={labelSize}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`translate(${leftRightBorders + 1.5 * spaceBetweenResidues})`}
              key={`group-SVGSequenceBreak-${index}`}
            >
              <SVGSequenceBreak
                internals={line.break}
                options={options}
                key={generateReactKey(`sequenceBreak-${index}`)}
              />
            </g>
            <g
              transform={`translate(0 ${
                -(
                  maxSequenceBreakAbove(line.break.filter((b) => b.fromEnd)) + 1
                ) * spaceBetweenInternalLines
              })`}
              key={`group-SVGSequenceFragments-${index}`}
            >
              <SVGSequenceFragments
                fragments={line.fragments}
                options={options}
                key={`SVGFragments-${index}`}
              />
            </g>
          </g>
        </React.Fragment>
      ))}
    </svg>
  );
}
