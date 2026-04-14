/* eslint-disable @typescript-eslint/no-explicit-any -- results are gradually augmented with fields that don't exist on the raw input */

import type {
  AnalysisResult,
  FilterOptions,
  Fragment,
  Internal,
  MassFragmentationData,
  MergeOptions,
} from './types.js';

type MutableResult = AnalysisResult &
  Record<string, any> & {
    members?: unknown[];
  };

/**
 * Group results by fragment/internal and by position so that several results
 * sharing the same position appear stacked as `members`.
 * @param data - Data object mutated in place.
 */
export function sortResults(data: MassFragmentationData): void {
  const results = data.results as unknown as MutableResult[];
  const newResults: {
    internals: Internal[];
    fragments: Fragment[];
  } = {
    internals: [],
    fragments: [],
  };
  while (results.length > 0) {
    const result = results.pop() as MutableResult;
    const resultType = 'position' in result ? 'fragments' : 'internals';
    const collection = newResults[resultType] as unknown as MutableResult[];
    const index = collection.findIndex((element) =>
      'position' in result
        ? element.position === result.position &&
          (element.fromBegin === result.fromBegin ||
            element.fromEnd === result.fromEnd)
        : element.from === result.from && element.to === result.to,
    );
    result.members = [
      {
        type: result.type,
        charge: result.charge,
        similarity: result.similarity,
        textColor: result.textColor,
      },
    ];

    const { type, charge, similarity, textColor, ...newResult } = result;
    if (index === -1) {
      collection.push(newResult as MutableResult);
    } else {
      (collection[index].members as unknown[]).push(
        (newResult.members as unknown[])[0],
      );
    }
  }
  data.results = newResults;
}

/**
 * Transform raw analysis results into the structure consumed by the renderer,
 * colouring them, merging by charge (if requested) and filtering them.
 * @param data - Data object mutated in place.
 * @param analysisResult - Raw analysis results.
 * @param options - Merge and filter options.
 * @param options.merge - Merge options.
 * @param options.filter - Filter options.
 */
export function appendResults(
  data: MassFragmentationData,
  analysisResult: AnalysisResult[],
  options: { merge?: MergeOptions; filter?: FilterOptions } = {},
): void {
  const numberResidues = data.residues.residues.length;
  const { merge = {}, filter = {} } = options;

  let results = structuredClone(analysisResult) as MutableResult[];
  results = results.filter((result) => !/^-B\d$/.test(result.type));
  for (const result of results) {
    const parts: string[] = result.type.split(/:|(?=[a-z])/);
    if (parts.length === 2) {
      result.internal = true;
      if (/^[a-d][1-9]/.test(parts[1])) {
        [parts[0], parts[1]] = [parts[1], parts[0]];
      }
      result.to = getNumber(parts[0]);
      result.from = numberResidues - getNumber(parts[1]);
    } else {
      if (/^[a-d][1-9]/.test(parts[0])) {
        result.fromBegin = true;
        result.position = getNumber(parts[0]) - 1;
      }
      if (/^[w-z][1-9]/.test(parts[0])) {
        result.fromEnd = true;
        result.position = numberResidues - 1 - getNumber(parts[0]);
      }
    }

    if (result.fromEnd) result.color = 'red';
    if (result.fromBegin) result.color = 'blue';
    if (result.internal) {
      switch (result.type.slice(0, 1)) {
        case 'a':
          result.color = 'green';
          break;
        case 'b':
          result.color = 'orange';
          break;
        case 'c':
          result.color = 'cyan';
          break;
        default:
          result.color = 'green';
      }
    }
  }

  if (merge.charge) {
    const unique: Record<string, MutableResult[]> = {};
    for (const result of results) {
      if (!unique[result.type]) {
        unique[result.type] = [];
      }
      unique[result.type].push(result);
    }
    results = [];
    for (const key in unique) {
      const current = unique[key][0];
      current.similarity = unique[key].reduce(
        (previous, item) => previous + item.similarity,
        0,
      );
      current.similarity = current.similarity / unique[key].length;
      results.push(current);
      current.charge = '';
    }
  }

  for (const result of results) {
    if (result.similarity > 0.95) {
      result.textColor = 'black';
    } else if (result.similarity > 0.9) {
      result.textColor = '#333';
    } else if (result.similariy > 0.8) {
      result.textColor = '#666';
    } else {
      result.textColor = '#999';
    }
  }

  results = filterResults(results, filter);

  results.sort((a, b) => (a as any).length - (b as any).length);
  data.results = results as unknown as MassFragmentationData['results'];
}

/**
 * Extract the numeric suffix from a fragment type (e.g. `b12` -> `12`).
 * @param text - Fragment type label.
 * @returns Numeric suffix parsed from the label.
 */
function getNumber(text: string): number {
  return Number(text.replace(/^.(?<number>\d+).*$/, '$<number>'));
}

/**
 * Filter out results based on similarity, quantity and whether internals should be shown.
 * @param results - Results to filter.
 * @param filter - Filter options.
 * @returns The filtered results.
 */
function filterResults(
  results: MutableResult[],
  filter?: FilterOptions,
): MutableResult[] {
  if (!filter) return results;
  const {
    minRelativeQuantity = 0,
    minSimilarity = 0,
    showInternals = true,
  } = filter;
  let { minQuantity = 0 } = filter;

  if (minRelativeQuantity) {
    minQuantity =
      Math.max(...results.map((entry) => entry.quantity ?? 0)) *
      minRelativeQuantity;
  }

  if (minSimilarity) {
    results = results.filter(
      (result) => !result.similarity || result.similarity >= minSimilarity,
    );
  }
  if (minQuantity) {
    results = results.filter(
      (result) => !result.quantity || result.quantity >= minQuantity,
    );
  }

  if (!showInternals) {
    results = results.filter((result) => !result.internal);
  }
  return results;
}
