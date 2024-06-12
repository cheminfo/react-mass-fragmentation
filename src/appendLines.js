function maxBreaksOnSequenceLine(breaks) {
  let maxBreaks = 0;
  for (let b of breaks) {
    if (b.members.length > maxBreaks) {
      maxBreaks = b.members.length;
    }
  }
  return maxBreaks;
}

export function appendLines(data, options) {
  const {
    width = 600,
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
    strokeWidth = 2,
    labelFontFamily = 'Verdana',
    labelSize = 8,
  } = options;
  const usefullWidth = width - 2 * leftRightBorders;
  const nbElementByLine = Math.trunc(usefullWidth / spaceBetweenResidues);
  const nbLine = Math.ceil(data.residues.all.length / nbElementByLine);
  const lines = [];
  for (let i = 0; i < nbLine; i++) {
    const line = {
      from: i * nbElementByLine,
      to: (i + 1) * nbElementByLine,
      residues: data.residues.all.slice(
        i * nbElementByLine,
        (i + 1) * nbElementByLine,
      ),
      break: data.results.break.filter(
        (b) =>
          b.position + 1 >= i * nbElementByLine &&
          b.position + 1 < (i + 1) * nbElementByLine,
      ),
      fragments: data.results.fragment.filter(
        (f) =>
          f.from >= i * nbElementByLine || f.to <= (i + 1) * nbElementByLine,
      ),
    };
    lines.push(line);
  }
  data.height = 0;
  let lastHeightBelow = 0;
  for (let L of lines) {
    const nbFragment = L.fragments.length;
    const maxBreakAbove =
      maxBreaksOnSequenceLine(L.break.filter((b) => b.fromEnd)) + 1; // 1 : sequence line height + break symbols spaces
    const maxBreakBelow =
      maxBreaksOnSequenceLine(L.break.filter((b) => b.fromBegin)) + 1;
    L.heightBelow = maxBreakBelow * spaceBetweenInternalLines;
    L.heightAbove = (maxBreakAbove + nbFragment) * spaceBetweenInternalLines;
    data.height += L.heightBelow + L.heightAbove;
    L.totalheightAbove = lastHeightBelow + L.heightAbove;
    L.y = data.height - L.heightBelow;
    lastHeightBelow = L.heightBelow;
  }
  data.lines = lines;
}
