import React from 'react';

import { SVGSequenceLabel } from './SVGSequenceLabel';

export function SVGFragment({ fragment, indexFragment, options }) {
  const {
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
  } = options;
  const xStart =
    fragment.from === -1
      ? 0
      : leftRightBorders + fragment.from * spaceBetweenResidues;
  const xEnd = leftRightBorders + fragment.to * spaceBetweenResidues;
  const yLine = -indexFragment * spaceBetweenInternalLines;
  return (
    <>
      {fragment.members.map((member, memberIndex) => (
        <React.Fragment key={`FragmentMember-${memberIndex}`}>
          {
            <g
              transform={`translate(${xStart} ${yLine - memberIndex * spaceBetweenInternalLines})`}
              key={`group-fragment-${memberIndex}`}
            >
              <line
                x2={xEnd - xStart}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                stroke={fragment.color}
                key={`SVGFragment-${xStart}${xEnd}${memberIndex}`}
              />
              <g
                transform={`translate(${(xEnd - xStart) / 2} ${-strokeWidth - 1})`}
                key={`group-fragmentLabel-${memberIndex}`}
              >
                <SVGSequenceLabel
                  label={member.type}
                  charge={member.charge}
                  similarity={Math.trunc(member.similarity * 100)}
                  textColor={member.textColor}
                  options={options}
                  key={`fragmentLabel${member.type}${String(memberIndex)}`}
                />
              </g>
            </g>
          }
        </React.Fragment>
      ))}
    </>
  );
}
