/**
 * @typedef {import('../types.js').ResolvedOptions} ResolvedOptions
 */

/**
 * Render a single legend label for a replaced residue.
 * @param {object} props - Component props.
 * @param {string} props.legend - The legend text to display.
 * @param {ResolvedOptions} props.options - Rendering options.
 * @returns {import('react').JSX.Element} The SVG text element for this legend entry.
 */
export function Legend({ legend, options }) {
  const { labelFontFamily = 'Verdana', labelSize = 12 } = options;
  const fontSize = (2 * Number(labelSize)) / 3;
  return (
    <text
      fill="darkviolet"
      fontFamily={labelFontFamily}
      fontSize={fontSize}
      fontWeight="bold"
    >
      {legend}
    </text>
  );
}
