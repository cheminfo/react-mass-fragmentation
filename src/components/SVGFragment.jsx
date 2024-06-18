import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGFragment({
  fragment,
  firstIndexOnLine,
  y,
  indexFragment,
  options,
}) {
  const {
    width = 600,
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
    labelFontFamily = 'Verdana',
    labelSize = 8,
  } = options;
  const xStart =
    leftRightBorders +
    (fragment.from - firstIndexOnLine) * spaceBetweenResidues;
  const xEnd =
    leftRightBorders + (fragment.to - firstIndexOnLine) * spaceBetweenResidues;
  const yLine = y - indexFragment * spaceBetweenInternalLines;
  console.log(xStart, xEnd, (xEnd - xStart) / 2);
  return (
    <>
      {fragment.members.map((member, index) => (
        <>
          <line
            x1={xStart}
            y1={yLine - index * spaceBetweenInternalLines}
            x2={xEnd}
            y2={yLine - index * spaceBetweenInternalLines}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            stroke={fragment.color}
            key={`SVGFragment-${xStart}${xEnd}${index}`}
          />
          <SVGSequenceLabel
            x={Math.trunc((xEnd - xStart) / 2)}
            // x={xEnd}
            y={yLine - index * spaceBetweenInternalLines - strokeWidth}
            label={member.type}
            charge={member.charge}
            similarity={Math.trunc(member.similarity * 100)}
            textColor={member.textColor}
            options={options}
            key={`fragmentLabel${member.type}${String(index)}`}
          />
        </>
      ))}
    </>
  );
}
