import React from 'react';
import { v4 as uuid } from 'uuid';

import { initMassFragmentationData } from '../initMassFragmentationData.js';

import { Legend } from './Legend.js';
import { Sequence } from './Sequence.js';
import { SequenceFragment } from './SequenceFragment.js';
import { SequenceInternals } from './SequenceInternals.js';

/**
 * @typedef {import('../types.js').SequenceSVGOptions} SequenceSVGOptions
 * @typedef {import('../types.js').ResolvedOptions} ResolvedOptions
 * @typedef {import('../types.js').AnalysisResult} AnalysisResult
 * @typedef {import('../types.js').Internal} Internal
 */

/**
 * Compute the maximum number of members across all internal fragments.
 * @param {Internal[]} internals - Internal fragments of a sequence line.
 * @returns {number} The size of the largest `members` array.
 */
function maxSequenceBreakAbove(internals) {
  let max = 0;
  for (const internal of internals) {
    if (internal.members.length > max) max = internal.members.length;
  }
  return max;
}

/**
 * Main React component that renders the full mass fragmentation SVG.
 * @param {object} props - Component props.
 * @param {string} props.sequence - Peptide or nucleotide sequence.
 * @param {AnalysisResult[]} props.analysisResults - Raw analysis results to display.
 * @param {SequenceSVGOptions} props.options - Rendering and parsing options.
 * @returns {import('react').JSX.Element} The rendered SVG element.
 */
export function MassFragmentation({ sequence, analysisResults, options }) {
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
  const data = initMassFragmentationData(
    sequence,
    analysisResults,
    realOptions,
  );
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

/**
 * Fill in default values for rendering options.
 * @param {SequenceSVGOptions} [options] - User-provided options.
 * @returns {ResolvedOptions} The options with all defaults applied.
 */
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
