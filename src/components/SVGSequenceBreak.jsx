import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGSequenceBreak({ breaks, options }) {
  const {
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
  } = options;
  return (
    <>
      {breaks.map((sequenceBreak, index) => (
        <g
          transform={`translate(${(sequenceBreak.fromBegin ? -1 : 1) * strokeWidth + sequenceBreak.position * spaceBetweenResidues} 0)`}
          key={`group-SequenceBreak-${index}`}
        >
          <line
            y2={-8}
            stroke={sequenceBreak.color}
            strokeWidth={strokeWidth}
          />
          <line
            x2={sequenceBreak.fromBegin ? -5 : 5}
            y1={sequenceBreak.fromBegin ? 0 : -8}
            y2={sequenceBreak.fromBegin ? 5 : -8 - 5}
            stroke={sequenceBreak.color}
            strokeWidth={strokeWidth}
          />
          {sequenceBreak.members.map((m, index) => (
            <g
              transform={`translate(0 ${sequenceBreak.fromBegin ? 2 + (index + 1) * spaceBetweenInternalLines : -15 - index * spaceBetweenInternalLines})`}
              key={`group-breakLabel-${m.type}${index}`}
            >
              <SVGSequenceLabel
                label={m.type}
                charge={m.charge}
                similarity={Math.trunc(m.similarity * 100)}
                textColor={m.textColor}
                options={options}
                key={`breakLabel-${m.type}-${index}`}
              />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}
