import { SVGFragment } from './SVGFragment';

export function SVGSequenceFragments({ fragments, options }) {
  let indexFragment = 0;
  return (
    <>
      {fragments.map((fragment, index) => {
        let iF = indexFragment;
        indexFragment += fragment.members.length;
        return (
          <SVGFragment
            fragment={fragment}
            indexFragment={iF}
            options={options}
            key={`SVGFragment-${index}-${iF}`}
          />
        );
      })}
    </>
  );
}
