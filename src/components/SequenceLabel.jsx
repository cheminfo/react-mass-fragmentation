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
          {charge < 0 ? charge : `+ ${charge}`}
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
