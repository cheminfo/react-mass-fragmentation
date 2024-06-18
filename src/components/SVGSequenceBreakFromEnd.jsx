import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGSequenceBreakFromEnd({ sequenceBreak, options }) {
  const { spaceBetweenInternalLines = 12, strokeWidth = 2 } = options;
  return (
    <>
      <line
        y2={-8}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={sequenceBreak.color}
      />
      <line
        y1={-8}
        x2={5}
        y2={-8 - 5}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={sequenceBreak.color}
      />
      {sequenceBreak.members.map((m, index) => (
        <g
          transform={`translate(5 ${-15 - index * spaceBetweenInternalLines})`}
          key={`group-breakLabel${m.type}${index}`}
        >
          <SVGSequenceLabel
            label={m.type}
            charge={m.charge}
            similarity={Math.trunc(m.similarity * 100)}
            textColor={m.textColor}
            options={options}
            key={`breakLabelFromEnd${m.type}${String(index)}`}
          />
        </g>
      ))}
    </>
  );
}
