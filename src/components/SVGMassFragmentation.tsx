export function SVGMassFragmentation(props) {
  const { tree, ...options } = props;

  const svgSize = {
    width: 500,
    height: 500,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
    >
      <rect
        width="200"
        height="106"
        style={{ fill: 'red', fillOpacity: 0.2, stroke: 'black' }}
      />
    </svg>
  );
}
