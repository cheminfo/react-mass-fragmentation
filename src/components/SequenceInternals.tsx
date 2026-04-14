import type { JSX } from 'react';

import type {
  Internal as InternalFragment,
  ResolvedOptions,
} from '../types.js';

import { Internal } from './Internal.js';

interface SequenceInternalsProps {
  /** Internal fragments to display. */
  internals: InternalFragment[];
  /** Rendering options. */
  options: ResolvedOptions;
}

/**
 * Render the internal fragments of a sequence line, stacked on top of each other.
 * @param props - Component props.
 * @param props.internals - Internal fragments to display.
 * @param props.options - Rendering options.
 * @returns The rendered internal fragments.
 */
export function SequenceInternals({
  internals,
  options,
}: SequenceInternalsProps): JSX.Element {
  const internalElements: Array<{
    internal: InternalFragment;
    indexInternal: number;
  }> = [];
  let currentIndex = 0;

  for (const internal of internals) {
    internalElements.push({
      internal,
      indexInternal: currentIndex,
    });
    currentIndex += internal.members.length;
  }

  return (
    <>
      {internalElements.map(({ internal, indexInternal }) => (
        <Internal
          key={`${internal.from}-${internal.to}`}
          internal={internal}
          indexInternal={indexInternal}
          options={options}
        />
      ))}
    </>
  );
}
