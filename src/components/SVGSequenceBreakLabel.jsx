export function SVGSequenceBreakLabel({ x, y, label, charge, similarity }) {
  return (
    <>
      <text
        fill="#999999"
        fontFamily="verdana"
        fontSize="8"
        fontWeight="bold"
        textAnchor="end"
        svgjs:data="{'leading':'1.3'}"
        x={x}
        y={y}
      >
        {label}
      </text>
      <text
        fill="#999999"
        fontFamily="verdana"
        fontSize="4"
        svgjs:data="{'leading':'1.3'}"
        x={x}
        y={String(Number(y) - 4)}
      >
        {charge}
      </text>
      <text
        fill="#999999"
        fontFamily="verdana"
        fontSize="4"
        svgjs:data="{'leading':'1.3'}"
        x={x}
        y={y}
      >
        {similarity}
      </text>
    </>
  );
}
