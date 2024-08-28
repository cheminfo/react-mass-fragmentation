import { v4 as uuid } from 'uuid';

import { MassFragmentation } from '../src/components/MassFragmentation';

export default function Fragmentation({ sequence, analysisInfo, options }) {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
      key={uuid()}
    >
      <MassFragmentation
        sequence={sequence}
        analysisInfo={analysisInfo}
        options={options}
        key={uuid()}
      />
    </div>
  );
}
