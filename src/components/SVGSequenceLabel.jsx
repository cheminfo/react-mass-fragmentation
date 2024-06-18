export function SVGSequenceLabel({
  x,
  y,
  label,
  charge,
  similarity,
  textColor,
  options,
}) {
  const { labelFontFamily = 'Verdana', labelSize = 12 } = options;
  const fontSize = String((2 * Number(labelSize)) / 3);
  // console.log(x);
  return (
    <>
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="end"
        x={x}
        y={y}
      >
        {label}
      </text>
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={String(Number(fontSize) / 2)}
        x={x}
        y={String(Number(y) - fontSize / 2)}
      >
        {charge}
      </text>
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={String(Number(fontSize) / 2)}
        x={x}
        y={y}
      >
        {similarity}
      </text>
    </>
  );
}
