import type { JSX } from 'react';
import React from 'react';

import { initMassFragmentationData } from '../initMassFragmentationData.js';
import type {
  AnalysisResult,
  ResolvedOptions,
  SequenceSVGOptions,
} from '../types.js';

import { Legend } from './Legend.js';
import { Sequence } from './Sequence.js';
import { SequenceFragment } from './SequenceFragment.js';
import { SequenceInternals } from './SequenceInternals.js';

interface MassFragmentationProps {
  /** Peptide or nucleotide sequence. */
  sequence: string;
  /** Raw analysis results to display. */
  analysisResults: AnalysisResult[];
  /** Rendering and parsing options. */
  options: SequenceSVGOptions;
}

/**
 * Compute the maximum number of members across the given items.
 * @param items - Fragments or internals, any object with a `members` array.
 * @returns The size of the largest `members` array.
 */
function maxSequenceBreakAbove(items: Array<{ members: unknown[] }>): number {
  let max = 0;
  for (const item of items) {
    if (item.members.length > max) max = item.members.length;
  }
  return max;
}

/**
 * Main React component that renders the full mass fragmentation SVG.
 * @param props - Component props.
 * @param props.sequence - Peptide or nucleotide sequence.
 * @param props.analysisResults - Raw analysis results to display.
 * @param props.options - Rendering and parsing options.
 * @returns The rendered SVG element.
 */
export function MassFragmentation({
  sequence,
  analysisResults,
  options,
}: MassFragmentationProps): JSX.Element {
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
    >
      {data.lines.map((line) => (
        <React.Fragment key={line.from}>
          <g
            transform={`translate(0 ${line.y})`}
            fontFamily={labelFontFamily}
            fontWeight="bold"
          >
            <g fontSize={12}>
              <Sequence sequence={line.residues} options={realOptions} />
            </g>
            <g
              fontSize={labelSize}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`translate(${leftRightBorders + 1.5 * spaceBetweenResidues})`}
            >
              <SequenceFragment
                fragments={line.fragments}
                options={realOptions}
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
            >
              <SequenceInternals
                internals={line.internals}
                options={realOptions}
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
              key={label}
            >
              <Legend legend={label} options={realOptions} />
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

/**
 * Fill in default values for rendering options.
 * @param options - User-provided options.
 * @returns The options with all defaults applied.
 */
function getOptionsWithDefault(options: SequenceSVGOptions): ResolvedOptions {
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
