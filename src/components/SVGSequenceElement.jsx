export function SVGSequenceElement({ element, index, options }) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    labelFontFamily = 'Verdana',
    labelSize = 12,
  } = options;
  const x = String(leftRightBorders + index * spaceBetweenResidues);
  const y = '69';
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
      y={y}
      svgjs:data="{'leading':'1.3'}"
    >
      {element.label}
    </text>
  );
}
