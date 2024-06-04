export function SVGSequenceElement({ element, index }) {
  const x = String(10 + index * 30);
  const y = '69';
  let color = '#555555';
  if (element.replaced) {
    color = 'darkviolet';
  } else if (element.kind === 'begin' || element.kind === 'end') {
    color = '#cccccc';
  }
  return (
    <text
      fontFamily="Verdana"
      fontSize="12"
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
