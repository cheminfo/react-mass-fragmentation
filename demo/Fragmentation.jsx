import { v4 as uuid } from 'uuid';

import { SVGMassFragmentation } from '../src/components/SVGMassFragmentation';

export default function Fragmentation({ sequence, analysisInfo, options }) {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
      key={uuid()}
    >
      <SVGMassFragmentation
        sequence={sequence}
        analysisInfo={analysisInfo}
        options={options}
        key={uuid()}
      />
    </div>
  );
}
