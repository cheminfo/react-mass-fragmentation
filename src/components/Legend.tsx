import type { JSX } from 'react';

import type { ResolvedOptions } from '../types.js';

interface LegendProps {
  /** The legend text to display. */
  legend: string;
  /** Rendering options. */
  options: ResolvedOptions;
}

/**
 * Render a single legend label for a replaced residue.
 * @param props - Component props.
 * @param props.legend - The legend text to display.
 * @param props.options - Rendering options.
 * @returns The SVG text element for this legend entry.
 */
export function Legend({ legend, options }: LegendProps): JSX.Element {
  const { labelFontFamily, labelSize } = options;
  const fontSize = (2 * labelSize) / 3;
  return (
    <text
      fill="darkviolet"
      fontFamily={labelFontFamily}
      fontSize={fontSize}
      fontWeight="bold"
    >
      {legend}
    </text>
  );
}
