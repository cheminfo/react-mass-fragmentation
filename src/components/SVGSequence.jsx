import { SVGSequenceElement } from './SVGSequenceElement';

export function SVGSequence({ sequence, y, options }) {
  return (
    <>
      {sequence.map((e, index) => (
        <SVGSequenceElement
          element={e}
          y={y}
          index={index}
          options={options}
          key={`residue-${index}`}
        />
      ))}
    </>
  );
}
