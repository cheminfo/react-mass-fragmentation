/**
 * @typedef {import('../types.js').Residue} Residue
 * @typedef {import('../types.js').SequenceSVGOptions} SequenceSVGOptions
 */

/**
 * Render a single residue at a given position in the sequence.
 * @param {object} props - Component props.
 * @param {Residue} props.element - Residue to render.
 * @param {number} props.index - Position of the residue in the line.
 * @param {SequenceSVGOptions} props.options - Rendering options (with defaults applied here).
 * @returns {import('react').JSX.Element} The rendered text element.
 */
export function SequenceElement({ element, index, options }) {
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
