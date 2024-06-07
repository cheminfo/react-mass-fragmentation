import { SVGMassFragmentation } from '../src/components/SVGMassFragmentation';

export default function Fragmentation({ sequence, analysisInfo, options }) {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
    >
      <SVGMassFragmentation
        sequence={sequence}
        analysisInfo={analysisInfo}
        options={options}
      />
    </div>
  );
}
