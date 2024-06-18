import { SVGMassFragmentation } from '../src/components/SVGMassFragmentation';
import { generateReactKey } from '../src/generateReactKey.js';

export default function Fragmentation({ sequence, analysisInfo, options }) {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
      key={`SVG-${generateReactKey('')}`}
    >
      <SVGMassFragmentation
        sequence={sequence}
        analysisInfo={analysisInfo}
        options={options}
        key={`SVGMassFragmentation-${generateReactKey('')}`}
      />
    </div>
  );
}
