import type { JSX } from 'react';

import type { Residue, ResolvedOptions } from '../types.js';

interface SequenceProps {
  /** Residues to display on this line. */
  sequence: Residue[];
  /** Rendering options. */
  options: ResolvedOptions;
}

/**
 * Pick the text color for a residue based on its kind and replacement status.
 * @param element - Residue being rendered.
 * @returns A CSS color.
 */
function elementColor(element: Residue): string {
  if (element.replaced) {
    return 'darkviolet';
  } else if (element.kind === 'begin' || element.kind === 'end') {
    return '#cccccc';
  } else {
    return '#555555';
  }
}

/**
 * Render the residues of a single sequence line.
 * @param props - Component props.
 * @param props.sequence - Residues to display on this line.
 * @param props.options - Rendering options.
 * @returns The rendered residues.
 */
export function Sequence({ sequence, options }: SequenceProps): JSX.Element {
  const { leftRightBorders, spaceBetweenResidues } = options;
  return (
    <>
      {sequence.map((element, index) => (
        <text
          // eslint-disable-next-line react/no-array-index-key -- residue labels can repeat, so position is the natural identifier
          key={index}
          fill={elementColor(element)}
          x={leftRightBorders + index * spaceBetweenResidues}
          textAnchor="middle"
        >
          {element.label}
        </text>
      ))}
    </>
  );
}
