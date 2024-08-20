function maxBreaksOnSequenceLine(internals) {
  let maxBreaks = 0;
  for (let b of internals) {
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

/**
 * 
 * @param {Array<{from: number, to:number}>} lines 
 * @returns 
 */
function updatePositionOnLine(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let b of lines[i].break) {
      b.position = b.position - lines[i].from;
    }
    for (let f of lines[i].fragments) {
      f.from = f.from < lines[i].from ? -1 : f.from - lines[i].from;
      f.to = f.to > lines[i].to ? lines[i].to + 1 : f.to - lines[i].from;
    }
  }
  return lines;
}

export function appendLines(data, options) {
  const {
    width = 600,
    leftRightBorders = 50,
    spaceBetweenResidues = 30,
    spaceBetweenInternalLines = 12,
  } = options;
  const usefulWidth = width - 2 * leftRightBorders;
  const nbElementByLine = Math.trunc(usefulWidth / spaceBetweenResidues);
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
  for (let line of lines) {
    const nbFragment = totalFragments(line.fragments);
    const maxBreakAbove =
      maxBreaksOnSequenceLine(line.break.filter((b) => b.fromEnd)) + 1; // 1 : sequence line height + break symbols spaces
    const maxBreakBelow =
      maxBreaksOnSequenceLine(line.break.filter((b) => b.fromBegin)) + 1;
    line.heightBelow = maxBreakBelow * spaceBetweenInternalLines;
    line.heightAbove =
      (maxBreakAbove + nbFragment + 1) * spaceBetweenInternalLines;
    data.height += line.heightBelow + line.heightAbove;
    line.totalheightAbove = lastHeightBelow + line.heightAbove;
    line.y = data.height - line.heightBelow;
    lastHeightBelow = line.heightBelow;
  }
  updatePositionOnLine(lines);
  data.lines = lines;
}
