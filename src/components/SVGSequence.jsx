import { appendResidues } from '../appendResidues';

import { SVGSequenceElement } from './SVGSequenceElement';

export function SVGSequence({ sequence, parsing }) {
  const grey = '#cccccc';
  const black = '#555555';
  const xStart = '10';
  const yStart = '69';
  const data = {};
  appendResidues(data, sequence, parsing);
  return (
    <>
      {data.residues.all.map((e, index) => (
        <SVGSequenceElement
          element={e}
          index={index}
          key={`residue-${index}`}
        />
      ))}
    </>
  );
}
