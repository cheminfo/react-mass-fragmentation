export function SVGSequenceBreakFromBegin({ sequenceBreak, options }) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    strokeWidth = 2,
  } = options;
  const xStart = leftRightBorders + 1.5 * spaceBetweenResidues;
  const x = xStart + sequenceBreak.position * spaceBetweenResidues;
  const y = '69';
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
    </>
  );
}
