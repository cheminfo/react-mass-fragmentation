import { SVGMassFragmentation } from '../src/components/SVGMassFragmentation';

export default function Fragmentation() {
  return (
    <>
      <h1>Fragmentation</h1>
      <div
        style={{
          border: '1px solid red',
          overflow: 'clip',
        }}
      >
        <SVGMassFragmentation />
      </div>
    </>
  );
}
