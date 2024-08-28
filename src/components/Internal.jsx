import React from 'react';
import { v4 as uuid } from 'uuid';

import { SequenceLabel } from './SequenceLabel';

export function Internal({ internal, indexInternal, options }) {
  const {
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
    strokeWidth,
  } = options;
  const xStart =
    internal.from === -1
      ? 0
      : leftRightBorders + internal.from * spaceBetweenResidues;
  const xEnd = leftRightBorders + internal.to * spaceBetweenResidues;
  const yLine = -indexInternal * spaceBetweenInternalLines;
  return (
    <>
      {internal.members.map((member, memberIndex) => (
        <React.Fragment key={uuid()}>
          {
            <g
              transform={`translate(${xStart} ${yLine - memberIndex * spaceBetweenInternalLines})`}
              key={uuid()}
            >
              <line
                x2={xEnd - xStart}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                stroke={internal.color}
                key={uuid()}
              />
              <g
                transform={`translate(${(xEnd - xStart) / 2} ${-strokeWidth - 1})`}
                key={uuid()}
              >
                <SequenceLabel
                  label={member.type}
                  charge={member.charge}
                  similarity={Math.trunc(member.similarity * 100)}
                  textColor={member.textColor}
                  options={options}
                  key={uuid()}
                />
              </g>
            </g>
          }
        </React.Fragment>
      ))}
    </>
  );
}
