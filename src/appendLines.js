function maxFragmentsOnSequenceLine(fragments) {
  let maxFragments = 0;
  for (let f of fragments) {
    if (f.members.length > maxFragments) {
      maxFragments = f.members.length;
    }
  }
  return maxFragments;
}

function totalInternals(internals) {
  let total = 0;
  for (let i of internals) {
    total += i.members.length;
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
    for (let f of lines[i].fragments) {
      f.position = f.position - lines[i].from;
    }
    for (let internal of lines[i].internals) {
      internal.from =
        internal.from < lines[i].from ? -1 : internal.from - lines[i].from;
      internal.to =
        internal.to >= lines[i].to
          ? Infinity //lines[i].to + 1
          : internal.to - lines[i].from;
    }
  }
  return lines;
}

/**
 * @param {object} data
 * @param {object} options
 * @param {number} options.width
 * @param {number} options.leftRightBorders
 * @param {number} options.spaceBetweenResidues
 * @param {number} options.spaceBetweenInternalLines
 */
export function appendLines(data, options) {
  const {
    width,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
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
      fragments: structuredClone(
        data.results.fragments.filter(
          (f) =>
            f.position + 1 >= i * nbElementByLine &&
            f.position + 1 < (i + 1) * nbElementByLine,
        ),
      ),
      internals: structuredClone(
        data.results.internals.filter(
          (internal) =>
            internal.from >= i * nbElementByLine ||
            internal.to >= i * nbElementByLine,
        ),
      ),
    };
    lines.push(line);
  }
  data.height = 0;
  let lastHeightBelow = 0;
  for (let line of lines) {
    const nbInternals = totalInternals(line.internals);
    const maxFragmentsAbove =
      maxFragmentsOnSequenceLine(line.fragments.filter((f) => f.fromEnd)) + 1; // 1 : sequence line height + break symbols spaces
    const maxFragmentsBelow =
      maxFragmentsOnSequenceLine(line.fragments.filter((f) => f.fromBegin)) + 1;
    line.heightBelow = maxFragmentsBelow * spaceBetweenInternalLines;
    line.heightAbove =
      (maxFragmentsAbove + nbInternals + 1) * spaceBetweenInternalLines;
    data.height += line.heightBelow + line.heightAbove;
    line.totalheightAbove = lastHeightBelow + line.heightAbove;
    line.y = data.height - line.heightBelow;
    lastHeightBelow = line.heightBelow;
  }
  updatePositionOnLine(lines);

  if (Object.keys(data.residues.replacements).length > 0) {
    const replacementsNumber = Object.keys(data.residues.replacements).length;
    const legend = {
      y: data.height + spaceBetweenInternalLines,
      labels: [],
    };
    for (let replacement in data.residues.replacements) {
      legend.labels.push(
        `${data.residues.replacements[replacement].label} = ${replacement}`,
      );
    }
    data.height += (replacementsNumber + 1) * spaceBetweenInternalLines;
    data.legend = legend;
  }

  data.lines = lines;
}
