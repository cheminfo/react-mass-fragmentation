import { SVGSequenceBreakLabel } from './SVGSequenceBreakLabel';

export function SVGSequenceBreakFromEnd({
  sequenceBreak,
  indexOnLine,
  y,
  options,
}) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
    labelSize = 8,
  } = options;
  const xStart = leftRightBorders + 1.5 * spaceBetweenResidues + strokeWidth;
  const x = xStart + indexOnLine * spaceBetweenResidues;
  return (
    <>
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={String(Number(y) - 8)}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={sequenceBreak.color}
      />
      <line
        x1={x}
        y1={String(Number(y) - 8)}
        x2={String(Number(x) + 5)}
        y2={String(Number(y) - 8 - 5)}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={sequenceBreak.color}
      />
      {sequenceBreak.members.map((m, index) => (
        <SVGSequenceBreakLabel
          x={x}
          y={String(Number(y) - 15 - index * labelSize)}
          label={m.type}
          charge={m.charge}
          similarity={Math.trunc(m.similarity * 100)}
          options={options}
          key={`breakLabelFromEnd${m.type}${String(index)}`}
        />
      ))}
    </>
  );
}
