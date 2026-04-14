/**
 * @typedef {import('./types.js').MassFragmentationData} MassFragmentationData
 * @typedef {import('./types.js').LineData} LineData
 * @typedef {import('./types.js').Fragment} Fragment
 * @typedef {import('./types.js').Internal} Internal
 */

/**
 * Compute the maximum number of members across all terminal fragments on a line.
 * @param {Fragment[]} fragments - Fragments of a sequence line.
 * @returns {number} The size of the largest `members` array.
 */
function maxFragmentsOnSequenceLine(fragments) {
  let maxFragments = 0;
  for (const fragment of fragments) {
    if (fragment.members.length > maxFragments) {
      maxFragments = fragment.members.length;
    }
  }
  return maxFragments;
}

/**
 * Sum the number of members across all internal fragments.
 * @param {Internal[]} internals - Internal fragments of a sequence line.
 * @returns {number} The total number of members.
 */
function totalInternals(internals) {
  let total = 0;
  for (const internal of internals) {
    total += internal.members.length;
  }
  return total;
}

/**
 * Convert absolute residue positions stored on each line to positions
 * relative to the start of that line.
 * @param {LineData[]} lines - Lines whose fragments and internals should be remapped.
 * @returns {LineData[]} The same lines, mutated in place, returned for chaining.
 */
function updatePositionOnLine(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (const fragment of lines[i].fragments) {
      fragment.position = fragment.position - lines[i].from;
    }
    for (const internal of lines[i].internals) {
      internal.from =
        internal.from < lines[i].from ? -1 : internal.from - lines[i].from;
      internal.to =
        internal.to >= lines[i].to ? Infinity : internal.to - lines[i].from;
    }
  }
  return lines;
}

/**
 * Split residues and results into lines that fit inside the available width
 * and compute per-line heights.
 * @param {MassFragmentationData} data - Data object mutated in place.
 * @param {object} options - Layout options.
 * @param {number} options.width - Total SVG width.
 * @param {number} options.leftRightBorders - Left/right border width.
 * @param {number} options.spaceBetweenResidues - Horizontal space between residues.
 * @param {number} options.spaceBetweenInternalLines - Vertical space between internal lines.
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
  /** @type {LineData[]} */
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
          (fragment) =>
            fragment.position + 1 >= i * nbElementByLine &&
            fragment.position + 1 < (i + 1) * nbElementByLine,
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
  for (const line of lines) {
    const nbInternals = totalInternals(line.internals);
    const maxFragmentsAbove =
      maxFragmentsOnSequenceLine(line.fragments.filter((f) => f.fromEnd)) + 1;
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
    /** @type {import('./types.js').Legend} */
    const legend = {
      y: data.height + spaceBetweenInternalLines,
      labels: [],
    };
    for (const replacement in data.residues.replacements) {
      legend.labels.push(
        `${data.residues.replacements[replacement].label} = ${replacement}`,
      );
    }
    data.height += (replacementsNumber + 1) * spaceBetweenInternalLines;
    data.legend = legend;
  }

  data.lines = lines;
}
