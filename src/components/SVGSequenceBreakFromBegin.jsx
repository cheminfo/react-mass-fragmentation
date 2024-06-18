import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGSequenceBreakFromBegin({
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
  } = options;
  const xStart = leftRightBorders + 1.5 * spaceBetweenResidues - strokeWidth;
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
        y1={y}
        x2={String(Number(x) - 5)}
        y2={String(Number(y) + 5)}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={sequenceBreak.color}
      />
      {sequenceBreak.members.map((m, index) => (
        <SVGSequenceLabel
          x={x}
          y={String(Number(y) + 15 + index * spaceBetweenInternalLines)}
          label={m.type}
          charge={m.charge}
          similarity={Math.trunc(m.similarity * 100)}
          textColor={m.textColor}
          options={options}
          key={`breakLabelFromBegin${m.type}${String(index)}`}
        />
      ))}
    </>
  );
}
