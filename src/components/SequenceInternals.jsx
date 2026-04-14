import { v4 as uuid } from 'uuid';

import { Internal } from './Internal.js';

/**
 * @typedef {import('../types.js').Internal} InternalFragment
 * @typedef {import('../types.js').ResolvedOptions} ResolvedOptions
 */

/**
 * Render the internal fragments of a sequence line, stacked on top of each other.
 * @param {object} props - Component props.
 * @param {InternalFragment[]} props.internals - Internal fragments to display.
 * @param {ResolvedOptions} props.options - Rendering options.
 * @returns {import('react').JSX.Element} The rendered internal fragments.
 */
export function SequenceInternals({ internals, options }) {
  const internalElements = [];
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
          internal={internal}
          indexInternal={indexInternal}
          options={options}
          key={uuid()}
        />
      ))}
    </>
  );
}
