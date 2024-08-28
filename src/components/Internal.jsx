import React from 'react';
import { v4 as uuid } from 'uuid';

import { SequenceLabel } from './SequenceLabel';

export function Internal({ internal, indexInternal, options }) {
  const {
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
    strokeWidth,
    labelSize,
    width,
  } = options;

  const fontSize = (2 * Number(labelSize)) / 3;
  const xStart =
    internal.from === -1
      ? 0
      : leftRightBorders + internal.from * spaceBetweenResidues;
  const xEnd =
    internal.to === Infinity
      ? width
      : leftRightBorders + internal.to * spaceBetweenResidues;
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
                x2={internal.to === Infinity ? width : xEnd - xStart}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                stroke={internal.color}
                key={uuid()}
              />
              <g
                transform={`translate(${(xEnd - xStart + (member.type.length * fontSize * 2) / 3) / 2} ${-strokeWidth - 1})`}
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
