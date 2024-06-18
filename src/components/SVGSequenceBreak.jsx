import { SVGSequenceBreakFromBegin } from './SVGSequenceBreakFromBegin';
import { SVGSequenceBreakFromEnd } from './SVGSequenceBreakFromEnd';

export function SVGSequenceBreak({ breaks, firstIndexOnLine, y, options }) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    strokeWidth = 2,
  } = options;
  return (
    <>
      {breaks
        .filter((b) => b.fromBegin)
        .map((b, index) => (
          <g
            transform={`translate(${leftRightBorders + 1.5 * spaceBetweenResidues - strokeWidth + (b.position - firstIndexOnLine) * spaceBetweenResidues} ${y})`}
            key={`group-SequenceBreakFromBegin-${index}`}
          >
            <SVGSequenceBreakFromBegin
              sequenceBreak={b}
              indexOnLine={b.position - firstIndexOnLine}
              options={options}
              key={`breakFromBegin-${index}`}
            />
          </g>
        ))}
      {breaks
        .filter((b) => b.fromEnd)
        .map((b, index) => (
          <g
            transform={`translate(${leftRightBorders + 1.5 * spaceBetweenResidues + strokeWidth + (b.position - firstIndexOnLine) * spaceBetweenResidues} ${y})`}
            key={`group-SequenceBreakFromEnd-${index}`}
          >
            <SVGSequenceBreakFromEnd
              sequenceBreak={b}
              indexOnLine={b.position - firstIndexOnLine}
              options={options}
              key={`breakFromEnd-${index}`}
            />
          </g>
        ))}
    </>
  );
}
