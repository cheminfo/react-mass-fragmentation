import { v4 as uuid } from 'uuid';

import { SVGInternal } from './SVGInternal';

export function SVGSequenceInternals({ internals, options }) {
  let indexInternal = 0;
  return (
    <>
      {internals.map((internal, index) => {
        let iI = indexInternal;
        indexInternal += internal.members.length;
        return (
          <SVGInternal
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
