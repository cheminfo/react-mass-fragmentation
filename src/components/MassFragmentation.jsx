import React from 'react';
import { v4 as uuid } from 'uuid';

import { initMassFragmentationData } from '../initMassFragmentationData.jsx';

import { Legend } from './Legend.jsx';
import { Sequence } from './Sequence.jsx';
import { SequenceFragment } from './SequenceFragment.jsx';
import { SequenceInternals } from './SequenceInternals.jsx';

function maxSequenceBreakAbove(internals) {
  let max = 0;
  for (let i of internals) {
    if (i.members.length > max) max = i.members.length;
  }
  return max;
}

/**
 * @param {object} props
 * @param {string} props.sequence
 * @param {object} props.analysisInfo
 * @param {object} props.options
 * @param {number} [props.options.leftRightBorders=50]
 * @param {string} [props.options.labelFontFamily='Verdana']
 * @param {number} [props.options.labelSize=12]
 * @param {number} [props.options.spaceBetweenResidues=30]
 * @param {number} [props.options.spaceBetweenInternalLines=12]
 * @param {number} [props.options.strokeWidth=2]
 * @param {number} [props.options.width=600]
 * @param {object} [props.options.parsing={}]
 * @param {object} [props.options.merge={}]
 * @param {object} [props.options.filter={}]
 * @returns {JSX.Element}
 */
export function MassFragmentation({ sequence, analysisInfo, options }) {
  const realOptions = getOptionsWithDefault(options);
  const {
    labelFontFamily,
    labelSize,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
    strokeWidth,
    width,
  } = realOptions;

  const data = initMassFragmentationData(sequence, analysisInfo, realOptions);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${data.height}`}
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
              <Sequence
                sequence={line.residues}
                options={realOptions}
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
              <SequenceFragment
                fragments={line.fragments}
                options={realOptions}
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
              <SequenceInternals
                internals={line.internals}
                options={realOptions}
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
              <Legend legend={label} options={realOptions} key={uuid()} />
            </g>
          ))}
        </g>
      ) : (
        <g />
      )}
    </svg>
  );
}

function getOptionsWithDefault(options) {
  return {
    labelFontFamily: 'Verdana',
    labelSize: 12,
    leftRightBorders: 50,
    spaceBetweenResidues: 30,
    spaceBetweenInternalLines: 12,
    strokeWidth: 2,
    width: 600,
    parsing: {},
    merge: {},
    filter: {},
    ...options,
  };
}
