import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { MassFragmentation } from './components/MassFragmentation';

export interface SequenceSVGOptions {
  /**
   * @default 50
   */
  leftRightBorders?: number;

  /**
   * @default 600
   */
  width?: number;

  /**
   * @default 30
   */
  spaceBetweenResidues?: number;

  /**
   * @default 12
   */
  spaceBetweenInternalLines?: number;

  /**
   * @default 2
   */
  strokeWidth?: number;

  /**
   * @default 'Verdana'
   */
  labelFontFamily?: string;

  /**
   * @default 8
   */
  labelSize?: number;

  /**
   * Sequence parsing options
   */
  parsing?: Record<string, any>;
  merge?: {
    /**
     * Merge results if only differs by a charge
     */
    charge?: boolean;
  };
  filter?: {
    /**
     * @default 0
     */
    minSimilarity?: number;

    /**
     * @default 0
     */
    minQuantity?: number;

    /**
     * minimal relative quantity. This value should be between 0 and 1 and supersede minQuantity.
     * @default 0
     */
    minRelativeQuantity?: number;

    /**
     * @default true
     */
    showInternals?: boolean;
  };
}

export function sequenceSVG(
  sequence: string,
  analysisResults,
  options: SequenceSVGOptions,
): string {
  const element = (
    <MassFragmentation
      sequence={sequence}
      analysisResults={analysisResults}
      {...options}
    />
  );
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(element);
  });
  return div.innerHTML;
}
