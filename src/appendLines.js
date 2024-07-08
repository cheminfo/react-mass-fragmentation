function maxBreaksOnSequenceLine(breaks) {
  let maxBreaks = 0;
  for (let b of breaks) {
    if (b.members.length > maxBreaks) {
      maxBreaks = b.members.length;
    }
  }
  return maxBreaks;
}

function totalFragments(fragments) {
  let total = 0;
  for (let f of fragments) {
    total += f.members.length;
  }
  return total;
}

function updatePositionOnLine(Lines) {
  for (let i = 0; i < Lines.length; i++) {
    for (let b of Lines[i].break) {
      b.position = b.position - Lines[i].from;
    }
    for (let f of Lines[i].fragments) {
      f.from = f.from < Lines[i].from ? -1 : f.from - Lines[i].from;
      f.to = f.to > Lines[i].to ? Lines[i].to + 1 : f.to - Lines[i].from;
    }
  }
  return Lines;
}

export function appendLines(data, options) {
  const {
    width = 600,
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
  } = options;
  const usefullWidth = width - 2 * leftRightBorders;
  const nbElementByLine = Math.trunc(usefullWidth / spaceBetweenResidues);
  const nbLine = Math.ceil(data.residues.all.length / nbElementByLine);
  const lines = [];
  for (let i = 0; i < nbLine; i++) {
    const line = {
      from: i * nbElementByLine,
      to: (i + 1) * nbElementByLine,
      residues: structuredClone(
        data.residues.all.slice(i * nbElementByLine, (i + 1) * nbElementByLine),
      ),
      break: structuredClone(
        data.results.break.filter(
          (b) =>
            b.position + 1 >= i * nbElementByLine &&
            b.position + 1 < (i + 1) * nbElementByLine,
        ),
      ),
      fragments: structuredClone(
        data.results.fragment.filter(
          (f) =>
            f.from >= i * nbElementByLine || f.to <= (i + 1) * nbElementByLine,
        ),
      ),
    };
    lines.push(line);
  }
  data.height = 0;
  let lastHeightBelow = 0;
  for (let L of lines) {
    const nbFragment = totalFragments(L.fragments);
    const maxBreakAbove =
      maxBreaksOnSequenceLine(L.break.filter((b) => b.fromEnd)) + 1; // 1 : sequence line height + break symbols spaces
    const maxBreakBelow =
      maxBreaksOnSequenceLine(L.break.filter((b) => b.fromBegin)) + 1;
    L.heightBelow = maxBreakBelow * spaceBetweenInternalLines;
    L.heightAbove =
      (maxBreakAbove + nbFragment + 1) * spaceBetweenInternalLines;
    data.height += L.heightBelow + L.heightAbove;
    L.totalheightAbove = lastHeightBelow + L.heightAbove;
    L.y = data.height - L.heightBelow;
    lastHeightBelow = L.heightBelow;
  }
  updatePositionOnLine(lines);
  data.lines = lines;
}
