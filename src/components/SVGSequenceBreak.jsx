import { SVGSequenceBreakFromBegin } from './SVGSequenceBreakFromBegin';
import { SVGSequenceBreakFromEnd } from './SVGSequenceBreakFromEnd';

export function SVGSequenceBreak({ breaks, options }) {
  const { spaceBetweenResidues = 30, strokeWidth = 2 } = options;
  return (
    <>
      {breaks
        .filter((b) => b.fromBegin)
        .map((b, index) => (
          <g
            transform={`translate(${-strokeWidth + b.position * spaceBetweenResidues} 0)`}
            key={`group-SequenceBreakFromBegin-${index}`}
          >
            <SVGSequenceBreakFromBegin
              sequenceBreak={b}
              options={options}
              key={`breakFromBegin-${index}`}
            />
          </g>
        ))}
      {breaks
        .filter((b) => b.fromEnd)
        .map((b, index) => (
          <g
            transform={`translate(${strokeWidth + b.position * spaceBetweenResidues} 0)`}
            key={`group-SequenceBreakFromEnd-${index}`}
          >
            <SVGSequenceBreakFromEnd
              sequenceBreak={b}
              options={options}
              key={`breakFromEnd-${index}`}
            />
          </g>
        ))}
    </>
  );
}
