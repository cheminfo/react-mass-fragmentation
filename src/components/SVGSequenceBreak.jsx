import { SVGSequenceBreakFromBegin } from './SVGSequenceBreakFromBegin';
import { SVGSequenceBreakFromEnd } from './SVGSequenceBreakFromEnd';

export function SVGSequenceBreak({ breaks, options }) {
  return (
    <>
      {breaks
        .filter((b) => b.fromBegin)
        .map((b, index) => (
          <SVGSequenceBreakFromBegin
            sequenceBreak={b}
            options={options}
            key={`breakFromBegin-${index}`}
          />
        ))}
      {breaks
        .filter((b) => b.fromEnd)
        .map((b, index) => (
          <SVGSequenceBreakFromEnd
            sequenceBreak={b}
            options={options}
            key={`breakFromEnd-${index}`}
          />
        ))}
    </>
  );
}
