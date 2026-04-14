import React from 'react';
import { v4 as uuid } from 'uuid';

/**
 * @typedef {import('../types.js').Residue} Residue
 * @typedef {import('../types.js').ResolvedOptions} ResolvedOptions
 */

/**
 * Pick the text color for a residue based on its kind and replacement status.
 * @param {Residue} element - Residue being rendered.
 * @returns {string} A CSS color.
 */
function elementColor(element) {
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
 * @param {object} props - Component props.
 * @param {Residue[]} props.sequence - Residues to display on this line.
 * @param {ResolvedOptions} props.options - Rendering options.
 * @returns {import('react').JSX.Element} The rendered residues.
 */
export function Sequence({ sequence, options }) {
  const { leftRightBorders, spaceBetweenResidues } = options;
  return (
    <>
      {sequence.map((element, index) => (
        <React.Fragment key={uuid()}>
          <text
            fill={elementColor(element)}
            x={leftRightBorders + index * spaceBetweenResidues}
            textAnchor="middle"
          >
            {element.label}
          </text>
        </React.Fragment>
      ))}
    </>
  );
}
