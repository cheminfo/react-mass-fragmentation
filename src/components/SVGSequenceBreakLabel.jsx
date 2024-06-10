export function SVGSequenceBreakLabel({
  x,
  y,
  label,
  charge,
  similarity,
  options,
}) {
  const { labelFontFamily = 'Verdana', labelSize = 12 } = options;
  const fontSize = String((2 * Number(labelSize)) / 3);
  return (
    <>
      <text
        fill="#999999"
        fontFamily={labelFontFamily}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="end"
        svgjs:data="{'leading':'1.3'}"
        x={x}
        y={y}
      >
        {label}
      </text>
      <text
        fill="#999999"
        fontFamily={labelFontFamily}
        fontSize={String(Number(fontSize) / 2)}
        svgjs:data="{'leading':'1.3'}"
        x={x}
        y={String(Number(y) - 4)}
      >
        {charge}
      </text>
      <text
        fill="#999999"
        fontFamily={labelFontFamily}
        fontSize={String(Number(fontSize) / 2)}
        svgjs:data="{'leading':'1.3'}"
        x={x}
        y={y}
      >
        {similarity}
      </text>
    </>
  );
}
