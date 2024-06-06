import { SVGSequenceBreakFromBegin } from './SVGSequenceBreakFromBegin';
import { SVGSequenceBreakFromEnd } from './SVGSequenceBreakFromEnd';

export function SVGSequenceBreak({ breaks, options }) {
  return (
    <>
      {breaks
        .filter((b) => b.fromBegin)
        .map((b) => (
          <SVGSequenceBreakFromBegin sequenceBreak={b} options={options} />
        ))}
      {breaks
        .filter((b) => b.fromEnd)
        .map((b) => (
          <SVGSequenceBreakFromEnd sequenceBreak={b} options={options} />
        ))}
    </>
  );
}
