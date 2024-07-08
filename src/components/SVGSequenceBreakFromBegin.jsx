import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGSequenceBreakFromBegin({ sequenceBreak, options }) {
  const { spaceBetweenInternalLines = 12 } = options;
  return (
    <>
      <line y2={-8} stroke={sequenceBreak.color} />
      <line x2={-5} y2={5} stroke={sequenceBreak.color} />
      {sequenceBreak.members.map((m, index) => (
        <g
          transform={`translate(0 ${2 + (index + 1) * spaceBetweenInternalLines})`}
          key={`group-breakLabel${m.type}${index}`}
        >
          <SVGSequenceLabel
            label={m.type}
            charge={m.charge}
            similarity={Math.trunc(m.similarity * 100)}
            textColor={m.textColor}
            options={options}
            key={`breakLabelFromBegin${m.type}${index}`}
          />
        </g>
      ))}
    </>
  );
}
