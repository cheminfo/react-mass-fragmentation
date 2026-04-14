import type { JSX } from 'react';

import type { Fragment, ResolvedOptions } from '../types.js';

import { SequenceLabel } from './SequenceLabel.js';

interface SequenceFragmentProps {
  /** Fragments to display. */
  fragments: Fragment[];
  /** Rendering options. */
  options: ResolvedOptions;
}

/**
 * Render the terminal fragments (starting from begin or end) for a sequence line.
 * @param props - Component props.
 * @param props.fragments - Fragments to display.
 * @param props.options - Rendering options.
 * @returns The rendered fragment markers and labels.
 */
export function SequenceFragment({
  fragments,
  options,
}: SequenceFragmentProps): JSX.Element {
  const { spaceBetweenResidues, spaceBetweenInternalLines, strokeWidth } =
    options;
  return (
    <>
      {fragments.map((fragment) => (
        <g
          key={`${fragment.fromBegin ? 'b' : 'e'}-${fragment.position}`}
          transform={`translate(${(fragment.fromBegin ? -1 : 1) * strokeWidth + fragment.position * spaceBetweenResidues} 0)`}
        >
          <line y2={-8} stroke={fragment.color} strokeWidth={strokeWidth} />
          <line
            x2={fragment.fromBegin ? -5 : 5}
            y1={fragment.fromBegin ? 0 : -8}
            y2={fragment.fromBegin ? 5 : -8 - 5}
            stroke={fragment.color}
            strokeWidth={strokeWidth}
          />
          {fragment.members.map((member, memberIndex) => (
            <g
              key={`${member.type}-${member.charge}`}
              transform={`translate(${fragment.fromBegin ? 0 : 8} ${fragment.fromBegin ? 2 + (memberIndex + 1) * spaceBetweenInternalLines : -15 - memberIndex * spaceBetweenInternalLines})`}
            >
              <SequenceLabel
                label={member.type}
                charge={member.charge}
                similarity={Math.trunc(member.similarity * 100)}
                textColor={member.textColor}
                options={options}
              />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}
