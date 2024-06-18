import { SVGFragment } from './SVGFragment';

export function SVGSequenceFragments({
  fragments,
  firstIndexOnLine,
  y,
  options,
}) {
  const {
    width = 600,
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
    labelFontFamily = 'Verdana',
    labelSize = 8,
  } = options;
  let indexFragment = 0;
  return (
    <>
      {fragments.map((fragment, index) => {
        let iF = indexFragment;
        indexFragment += fragment.members.length;
        return (
          <SVGFragment
            fragment={fragment}
            firstIndexOnLine={firstIndexOnLine}
            y={y}
            indexFragment={iF}
            options={options}
            key={`SVGFragment-${index}`}
          />
        );
      })}
    </>
  );
}
