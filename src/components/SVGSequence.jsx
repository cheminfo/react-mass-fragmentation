import { SVGSequenceElement } from './SVGSequenceElement';

export function SVGSequence({ sequence, options }) {
  return (
    <>
      {sequence.residues.all.map((e, index) => (
        <SVGSequenceElement
          element={e}
          index={index}
          options={options}
          key={`residue-${index}`}
        />
      ))}
    </>
  );
}
