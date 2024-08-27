import { v4 as uuid } from 'uuid';

export function SVGLegend({ legend, options }) {
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
