import type { JSX } from 'react';

import type {
  Internal as InternalFragment,
  ResolvedOptions,
} from '../types.js';

import { SequenceLabel } from './SequenceLabel.js';

interface InternalProps {
  /** Internal fragment to render. */
  internal: InternalFragment;
  /** Vertical index used to stack multiple internals. */
  indexInternal: number;
  /** Rendering options. */
  options: ResolvedOptions;
}

/**
 * Render a single internal fragment row (one line plus its labels).
 * @param props - Component props.
 * @param props.internal - Internal fragment to render.
 * @param props.indexInternal - Vertical index used to stack multiple internals.
 * @param props.options - Rendering options.
 * @returns The SVG group for this internal fragment.
 */
export function Internal({
  internal,
  indexInternal,
  options,
}: InternalProps): JSX.Element {
  const {
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
    strokeWidth,
    labelSize,
    width,
  } = options;

  const fontSize = (2 * labelSize) / 3;
  const xStart =
    internal.from === -1
      ? 0
      : leftRightBorders + internal.from * spaceBetweenResidues;
  const xEnd =
    internal.to === Infinity
      ? width
      : leftRightBorders + internal.to * spaceBetweenResidues;
  const yLine = -indexInternal * spaceBetweenInternalLines;
  return (
    <>
      {internal.members.map((member, memberIndex) => (
        <g
          key={`${member.type}-${member.charge}`}
          transform={`translate(${xStart} ${yLine - memberIndex * spaceBetweenInternalLines})`}
        >
          <line
            x2={internal.to === Infinity ? width : xEnd - xStart}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            stroke={internal.color}
          />
          <g
            transform={`translate(${(xEnd - xStart + (member.type.length * fontSize * 2) / 3) / 2} ${-strokeWidth - 1})`}
          >
            <SequenceLabel
              label={member.type}
              charge={member.charge}
              similarity={Math.trunc(member.similarity * 100)}
              textColor={member.textColor}
              options={options}
            />
          </g>
        </g>
      ))}
    </>
  );
}
