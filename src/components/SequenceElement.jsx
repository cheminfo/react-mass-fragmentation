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
