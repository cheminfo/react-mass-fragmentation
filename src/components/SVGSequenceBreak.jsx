import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGSequenceBreak({ internals, options }) {
  const {
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
  } = options;
  return (
    <>
      {internals.map((internal, index) => (
        <g
          transform={`translate(${(internal.fromBegin ? -1 : 1) * strokeWidth + internal.position * spaceBetweenResidues} 0)`}
          key={`group-SequenceBreak-${index}`}
        >
          <line y2={-8} stroke={internal.color} strokeWidth={strokeWidth} />
          <line
            x2={internal.fromBegin ? -5 : 5}
            y1={internal.fromBegin ? 0 : -8}
            y2={internal.fromBegin ? 5 : -8 - 5}
            stroke={internal.color}
            strokeWidth={strokeWidth}
          />
          {internal.members.map((m, index) => (
            <g
              transform={`translate(0 ${internal.fromBegin ? 2 + (index + 1) * spaceBetweenInternalLines : -15 - index * spaceBetweenInternalLines})`}
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
