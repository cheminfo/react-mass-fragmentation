import { SVGMassFragmentation } from '../src/components/SVGMassFragmentation';

export default function Fragmentation() {
  return (
    <div
      style={{
        border: '1px solid red',
        overflow: 'clip',
      }}
    >
      <SVGMassFragmentation />
    </div>
  );
}
