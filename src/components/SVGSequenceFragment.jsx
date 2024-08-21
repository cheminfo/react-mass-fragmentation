import { v4 as uuid } from 'uuid';

import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGSequenceFragment({ fragments, options }) {
  const {
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
  } = options;
  return (
    <>
      {fragments.map((fragment) => (
        <g
          transform={`translate(${(fragment.fromBegin ? -1 : 1) * strokeWidth + fragment.position * spaceBetweenResidues} 0)`}
          key={uuid()}
        >
          <line y2={-8} stroke={fragment.color} strokeWidth={strokeWidth} />
          <line
            x2={fragment.fromBegin ? -5 : 5}
            y1={fragment.fromBegin ? 0 : -8}
            y2={fragment.fromBegin ? 5 : -8 - 5}
            stroke={fragment.color}
            strokeWidth={strokeWidth}
          />
          {fragment.members.map((m, index) => (
            <g
              transform={`translate(0 ${fragment.fromBegin ? 2 + (index + 1) * spaceBetweenInternalLines : -15 - index * spaceBetweenInternalLines})`}
              key={uuid()}
            >
              <SVGSequenceLabel
                label={m.type}
                charge={m.charge}
                similarity={Math.trunc(m.similarity * 100)}
                textColor={m.textColor}
                options={options}
                key={uuid()}
              />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}
