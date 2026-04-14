/**
 * @typedef {import('../types.js').ResolvedOptions} ResolvedOptions
 */

/**
 * Render a single result label: the type name, its charge and its similarity.
 * @param {object} props - Component props.
 * @param {string} props.label - Label text (e.g. fragment type).
 * @param {number | string} props.charge - Charge as a number, or empty string when unknown.
 * @param {number} props.similarity - Similarity percentage (0 to 100).
 * @param {string} props.textColor - Fill color for the label.
 * @param {ResolvedOptions} props.options - Rendering options.
 * @returns {import('react').JSX.Element} The rendered label text elements.
 */
export function SequenceLabel({
  label,
  charge,
  similarity,
  textColor,
  options,
}) {
  const { labelFontFamily = 'Verdana', labelSize } = options;
  const fontSize = (2 * Number(labelSize)) / 3;
  return (
    <>
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="end"
      >
        {label}
      </text>
      {!(charge === '') ? (
        <text
          fill={textColor}
          fontFamily={labelFontFamily}
          fontSize={fontSize / 2}
          fontWeight="normal"
          y={-(fontSize / 2)}
        >
          {charge < 0 ? charge : `+${charge}`}
        </text>
      ) : (
        ''
      )}
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={fontSize / 2}
        fontWeight="normal"
      >
        {similarity}
      </text>
    </>
  );
}
