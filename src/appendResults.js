/* eslint-disable jsdoc/reject-any-type --
 * Analysis results are gradually augmented with fields (`position`, `from`,
 * `to`, `color`, `members`, ...) that do not exist on the raw input. Typing
 * every intermediate shape would require many interfaces for little value, so
 * we use `any` for the in-flight result objects and rely on the public
 * `Fragment` / `Internal` types at the boundaries.
 */

/**
 * @typedef {import('./types.js').MassFragmentationData} MassFragmentationData
 * @typedef {import('./types.js').AnalysisResult} AnalysisResult
 * @typedef {import('./types.js').MergeOptions} MergeOptions
 * @typedef {import('./types.js').FilterOptions} FilterOptions
 */

/**
 * Group results by fragment/internal and by position so that several results
 * sharing the same position appear stacked as `members`.
 * @param {MassFragmentationData} data - Data object mutated in place.
 */
export function sortResults(data) {
  /** @type {any[]} */
  const results = /** @type {any} */ (data.results);
  const newResults = {
    /** @type {any[]} */
    internals: [],
    /** @type {any[]} */
    fragments: [],
  };
  while (results.length > 0) {
    const result = results.pop();
    const resultType = 'position' in result ? 'fragments' : 'internals';
    const index = newResults[resultType].findIndex((element) =>
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
    // eslint-disable-next-line no-unused-vars -- destructuring to strip fields
    const { type, charge, similarity, textColor, ...newResult } = result;
    if (index === -1) {
      newResults[resultType].push(newResult);
    } else {
      newResults[resultType][index].members.push(newResult.members[0]);
    }
  }
  data.results = newResults;
}

/**
 * Transform raw analysis results into the structure consumed by the renderer,
 * colouring them, merging by charge (if requested) and filtering them.
 * @param {MassFragmentationData} data - Data object mutated in place.
 * @param {AnalysisResult[]} analysisResult - Raw analysis results.
 * @param {object} [options] - Merge and filter options.
 * @param {MergeOptions} [options.merge] - Merge options.
 * @param {FilterOptions} [options.filter] - Filter options.
 */
export function appendResults(data, analysisResult, options = {}) {
  const numberResidues = data.residues.residues.length;
  const { merge = {}, filter = {} } = options;

  /** @type {any[]} */
  let results = structuredClone(analysisResult);
  results = results.filter((result) => !result.type.match(/^-B\d$/));
  for (const result of results) {
    const parts = result.type.split(/:|(?=[a-z])/);
    if (parts.length === 2) {
      result.internal = true;
      if (parts[1].match(/^[a-d][1-9]/)) {
        [parts[0], parts[1]] = [parts[1], parts[0]];
      }
      result.to = getNumber(parts[0]);
      result.from = numberResidues - getNumber(parts[1]);
    } else {
      if (parts[0].match(/^[a-d][1-9]/)) {
        result.fromBegin = true;
        result.position = getNumber(parts[0]) - 1;
      }
      if (parts[0].match(/^[w-z][1-9]/)) {
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
    /** @type {Record<string, any[]>} */
    const unique = {};
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

  results.sort((a, b) => a.length - b.length);
  data.results = /** @type {any} */ (results);
}

/**
 * Extract the numeric suffix from a fragment type (e.g. `b12` -> `12`).
 * @param {string} text - Fragment type label.
 * @returns {number} Numeric suffix parsed from the label.
 */
function getNumber(text) {
  return Number(text.replace(/^.(?<number>\d+).*$/, '$<number>'));
}

/**
 * Filter out results based on similarity, quantity and whether internals should be shown.
 * @param {any[]} results - Results to filter.
 * @param {FilterOptions} [filter] - Filter options.
 * @returns {any[]} The filtered results.
 */
function filterResults(results, filter) {
  if (!filter) return results;
  let {
    minRelativeQuantity = 0,
    minSimilarity = 0,
    minQuantity = 0,
    showInternals = true,
  } = filter;

  if (minRelativeQuantity) {
    minQuantity =
      Math.max(...results.map((entry) => entry.quantity)) * minRelativeQuantity;
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
