import { v4 as uuid } from 'uuid';

import { Internal } from './Internal';

export function SequenceInternals({ internals, options }) {
  let indexInternal = 0;
  return (
    <>
      {internals.map((internal) => {
        let iI = indexInternal;
        indexInternal += internal.members.length;
        return (
          <Internal
            internal={internal}
            indexInternal={iI}
            options={options}
            key={uuid()}
          />
        );
      })}
    </>
  );
}
