import type { JSX } from 'react';

import type { Residue, SequenceSVGOptions } from '../types.js';

interface SequenceElementProps {
  /** Residue to render. */
  element: Residue;
  /** Position of the residue in the line. */
  index: number;
  /** Rendering options (defaults are applied here). */
  options: SequenceSVGOptions;
}

/**
 * Render a single residue at a given position in the sequence.
 * @param props - Component props.
 * @param props.element - Residue to render.
 * @param props.index - Position of the residue in the line.
 * @param props.options - Rendering options (defaults are applied here).
 * @returns The rendered text element.
 */
export function SequenceElement({
  element,
  index,
  options,
}: SequenceElementProps): JSX.Element {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    labelFontFamily = 'Verdana',
    labelSize = 12,
  } = options;
  const x = String(leftRightBorders + index * spaceBetweenResidues);
  let color = '#555555';
  if (element.replaced) {
    color = 'darkviolet';
  } else if (element.kind === 'begin' || element.kind === 'end') {
    color = '#cccccc';
  }
  return (
    <text
      fontFamily={labelFontFamily}
      fontSize={String(labelSize)}
      fontWeight="bold"
      fill={color}
      x={x}
      textAnchor="middle"
    >
      {element.label}
    </text>
  );
}
