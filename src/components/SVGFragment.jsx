import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGFragment({
  fragment,
  firstIndexOnLine,
  y,
  indexFragment,
  options,
}) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
  } = options;
  const xStart =
    fragment.from < firstIndexOnLine
      ? 0
      : leftRightBorders +
        (fragment.from - firstIndexOnLine) * spaceBetweenResidues;
  const xEnd =
    leftRightBorders + (fragment.to - firstIndexOnLine) * spaceBetweenResidues;
  const yLine = y - indexFragment * spaceBetweenInternalLines;
  return (
    <>
      {fragment.members.map((member, index) => (
        <>
          {
            <g
              transform={`translate(${xStart} ${yLine - index * spaceBetweenInternalLines})`}
              key={`group-fragment-${index}`}
            >
              <line
                x2={xEnd - xStart}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                stroke={fragment.color}
                key={`SVGFragment-${xStart}${xEnd}${index}`}
              />
              <g
                transform={`translate(${(xEnd - xStart) / 2} ${-strokeWidth - 1})`}
                key={`group-fragmentLabel-${index}`}
              >
                <SVGSequenceLabel
                  label={member.type}
                  charge={member.charge}
                  similarity={Math.trunc(member.similarity * 100)}
                  textColor={member.textColor}
                  options={options}
                  key={`fragmentLabel${member.type}${String(index)}`}
                />
              </g>
            </g>
          }
        </>
      ))}
    </>
  );
}
