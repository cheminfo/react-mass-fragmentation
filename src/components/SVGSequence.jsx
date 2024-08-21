import React from 'react';
import { v4 as uuid } from 'uuid';

function elementColor(element) {
  if (element.replaced) {
    return 'darkviolet';
  } else if (element.kind === 'begin' || element.kind === 'end') {
    return '#cccccc';
  } else {
    return '#555555';
  }
}

export function SVGSequence({ sequence, options }) {
  const { leftRightBorders = 50, spaceBetweenResidues = 30 } = options;
  return (
    <>
      {sequence.map((element, index) => (
        <React.Fragment key={uuid()}>
          <text
            fill={elementColor(element)}
            x={leftRightBorders + index * spaceBetweenResidues}
            textAnchor="middle"
          >
            {element.label}
          </text>
        </React.Fragment>
      ))}
    </>
  );
}
