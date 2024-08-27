import React from 'react';
import { v4 as uuid } from 'uuid';

import { appendLines } from '../appendLines.js';
import { appendResidues } from '../appendResidues.js';
import { appendResults, sortResults } from '../appendResults.js';

import { SVGLegend } from './SVGLegend.jsx';
import { SVGSequence } from './SVGSequence.jsx';
import { SVGSequenceFragment } from './SVGSequenceFragment.jsx';
import { SVGSequenceInternals } from './SVGSequenceInternals.jsx';

function maxSequenceBreakAbove(internals) {
  let max = 0;
  for (let i of internals) {
    if (i.members.length > max) max = i.members.length;
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
      key={uuid()}
    >
      {data.lines.map((line) => (
        <React.Fragment key={uuid()}>
          <g
            transform={`translate(0 ${line.y})`}
            fontFamily={labelFontFamily}
            fontWeight="bold"
            key={uuid()}
          >
            <g fontSize={12} key={uuid()}>
              <SVGSequence
                sequence={line.residues}
                options={options}
                key={uuid()}
              />
            </g>
            <g
              fontSize={labelSize}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`translate(${leftRightBorders + 1.5 * spaceBetweenResidues})`}
              key={uuid()}
            >
              <SVGSequenceFragment
                fragments={line.fragments}
                options={options}
                key={uuid()}
              />
            </g>
            <g
              transform={`translate(0 ${
                -(
                  maxSequenceBreakAbove(
                    line.fragments.filter((fragment) => fragment.fromEnd),
                  ) + 1
                ) * spaceBetweenInternalLines
              })`}
              key={uuid()}
            >
              <SVGSequenceInternals
                internals={line.internals}
                options={options}
                key={uuid()}
              />
            </g>
          </g>
        </React.Fragment>
      ))}

      {data.legend ? (
        <g transform={`translate(${leftRightBorders} ${data.legend.y})`}>
          {data.legend.labels.map((label, index) => (
            <g
              transform={`translate(0 ${index * spaceBetweenInternalLines})`}
              key={uuid()}
            >
              <SVGLegend legend={label} options={options} key={uuid()} />
            </g>
          ))}
        </g>
      ) : (
        <g />
      )}
    </svg>
  );
}
