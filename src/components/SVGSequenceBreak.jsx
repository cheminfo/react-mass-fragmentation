import { SVGSequenceBreakFromBegin } from './SVGSequenceBreakFromBegin';
import { SVGSequenceBreakFromEnd } from './SVGSequenceBreakFromEnd';

export function SVGSequenceBreak({ breaks, firstIndexOnLine, y, options }) {
  return (
    <>
      {breaks
        .filter((b) => b.fromBegin)
        .map((b, index) => (
          <SVGSequenceBreakFromBegin
            sequenceBreak={b}
            indexOnLine={b.position - firstIndexOnLine}
            y={y}
            options={options}
            key={`breakFromBegin-${index}`}
          />
        ))}
      {breaks
        .filter((b) => b.fromEnd)
        .map((b, index) => (
          <SVGSequenceBreakFromEnd
            sequenceBreak={b}
            indexOnLine={b.position - firstIndexOnLine}
            y={y}
            options={options}
            key={`breakFromEnd-${index}`}
          />
        ))}
    </>
  );
}
