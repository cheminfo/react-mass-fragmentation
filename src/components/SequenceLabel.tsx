import type { JSX } from 'react';

import type { ResolvedOptions } from '../types.js';

interface SequenceLabelProps {
  /** Label text (e.g. fragment type). */
  label: string;
  /** Charge as a number, or empty string when unknown. */
  charge: number | string;
  /** Similarity percentage (0 to 100). */
  similarity: number;
  /** Fill color for the label. */
  textColor: string;
  /** Rendering options. */
  options: ResolvedOptions;
}

/**
 * Render a single result label: the type name, its charge and its similarity.
 * @param props - Component props.
 * @param props.label - Label text (e.g. fragment type).
 * @param props.charge - Charge as a number, or empty string when unknown.
 * @param props.similarity - Similarity percentage (0 to 100).
 * @param props.textColor - Fill color for the label.
 * @param props.options - Rendering options.
 * @returns The rendered label text elements.
 */
export function SequenceLabel({
  label,
  charge,
  similarity,
  textColor,
  options,
}: SequenceLabelProps): JSX.Element {
  const { labelFontFamily, labelSize } = options;
  const fontSize = (2 * labelSize) / 3;
  return (
    <>
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="end"
      >
        {label}
      </text>
      {charge !== '' ? (
        <text
          fill={textColor}
          fontFamily={labelFontFamily}
          fontSize={fontSize / 2}
          fontWeight="normal"
          y={-(fontSize / 2)}
        >
          {typeof charge === 'number' && charge < 0 ? charge : `+${charge}`}
        </text>
      ) : null}
      <text
        fill={textColor}
        fontFamily={labelFontFamily}
        fontSize={fontSize / 2}
        fontWeight="normal"
      >
        {similarity}
      </text>
    </>
  );
}
