import type {
  Fragment,
  Internal,
  Legend,
  LineData,
  MassFragmentationData,
} from './types.js';

interface AppendLinesOptions {
  /** Total SVG width. */
  width: number;
  /** Left/right border width. */
  leftRightBorders: number;
  /** Horizontal space between residues. */
  spaceBetweenResidues: number;
  /** Vertical space between internal lines. */
  spaceBetweenInternalLines: number;
}

/**
 * Split residues and results into lines that fit inside the available width
 * and compute per-line heights.
 * @param data - Data object mutated in place.
 * @param options - Layout options.
 */
export function appendLines(
  data: MassFragmentationData,
  options: AppendLinesOptions,
): void {
  const {
    width,
    leftRightBorders,
    spaceBetweenResidues,
    spaceBetweenInternalLines,
  } = options;
  const usefulWidth = width - 2 * leftRightBorders;
  const nbElementByLine = Math.trunc(usefulWidth / spaceBetweenResidues);
  const nbLine = Math.ceil(data.residues.all.length / nbElementByLine);
  const lines: LineData[] = [];
  for (let i = 0; i < nbLine; i++) {
    const line: LineData = {
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
      heightBelow: 0,
      heightAbove: 0,
      totalheightAbove: 0,
      y: 0,
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
    const legend: Legend = {
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

/**
 * Compute the maximum number of members across all terminal fragments on a line.
 * @param fragments - Fragments of a sequence line.
 * @returns The size of the largest `members` array.
 */
function maxFragmentsOnSequenceLine(fragments: Fragment[]): number {
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
 * @param internals - Internal fragments of a sequence line.
 * @returns The total number of members.
 */
function totalInternals(internals: Internal[]): number {
  let total = 0;
  for (const internal of internals) {
    total += internal.members.length;
  }
  return total;
}

/**
 * Convert absolute residue positions stored on each line to positions
 * relative to the start of that line.
 * @param lines - Lines whose fragments and internals should be remapped.
 * @returns The same lines, mutated in place, returned for chaining.
 */
function updatePositionOnLine(lines: LineData[]): LineData[] {
  for (const line of lines) {
    for (const fragment of line.fragments) {
      fragment.position = fragment.position - line.from;
    }
    for (const internal of line.internals) {
      internal.from =
        internal.from < line.from ? -1 : internal.from - line.from;
      internal.to = internal.to >= line.to ? Infinity : internal.to - line.from;
    }
  }
  return lines;
}
