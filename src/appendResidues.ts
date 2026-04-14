/* eslint-disable @typescript-eslint/no-explicit-any -- result is gradually refined from strings to structured objects */

import { groupsObject } from 'chemical-groups';
import * as Nucleotide from 'nucleotide';
import * as Peptide from 'peptide';

import type {
  MassFragmentationData,
  ParsingOptions,
  Replacement,
} from './types.js';

const ALTERNATIVES = ['', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
const SYMBOLS = ['Θ', 'Δ', 'Λ', 'Φ', 'Ω', 'Γ', 'Χ'];

let currentSymbol = 0;

/**
 * Split a sequence of amino acids or nucleotides, natural or non natural,
 * and populate `data.residues` with the resulting residue list.
 * @param data - Data object mutated in place.
 * @param sequence - Sequence to parse.
 * @param options - Parsing options.
 */
export function appendResidues(
  data: MassFragmentationData,
  sequence: string,
  options: ParsingOptions = {},
): void {
  const { kind = 'peptide' } = options;

  currentSymbol = 0;

  if (kind === 'peptide') {
    sequence = Peptide.sequenceToMF(sequence);
  } else {
    sequence = Nucleotide.sequenceToMF(sequence, options as never);
  }

  const result: any = {
    begin: '',
    end: '',
    residues: [],
    alternatives: {},
    replacements: {},
    all: [],
  };

  const STATE_BEGIN = 0;
  const STATE_MIDDLE = 1;
  const STATE_END = 2;

  let parenthesisLevel = 0;
  let state = STATE_BEGIN;
  for (let i = 0; i < sequence.length; i++) {
    const currentChar = sequence.charAt(i);
    const nextChar = i < sequence.length - 1 ? sequence.charAt(i + 1) : '';
    const nextNextChar = i < sequence.length - 2 ? sequence.charAt(i + 2) : '';

    if (
      state === STATE_BEGIN &&
      /[A-Z]/.test(currentChar) &&
      /[a-z]/.test(nextChar) &&
      /[a-z]/.test(nextNextChar) &&
      parenthesisLevel === 0
    ) {
      state = STATE_MIDDLE;
    }

    if (
      state === STATE_MIDDLE &&
      !/[A-Z][a-z]{2}/.test(sequence.slice(Math.max(0, i))) &&
      !/[a-z]/.test(currentChar) &&
      parenthesisLevel === 0
    ) {
      state = STATE_END;
    } else if (
      /[A-Z]/.test(currentChar) &&
      /[a-z]/.test(nextChar) &&
      /[a-z]/.test(nextNextChar) &&
      parenthesisLevel === 0
    ) {
      result.residues.push('');
    }

    switch (state) {
      case STATE_BEGIN:
        result.begin = `${result.begin}${currentChar}`;
        break;
      case STATE_MIDDLE:
        result.residues[result.residues.length - 1] =
          `${result.residues.at(-1)}${currentChar}`;
        break;
      case STATE_END:
        result.end = `${result.end}${currentChar}`;
        break;
      default:
    }

    if (currentChar === '(') {
      parenthesisLevel++;
    } else if (currentChar === ')') {
      parenthesisLevel--;
    }
  }

  const alternatives: Record<string, { count: number }> = {};
  const replacements: Record<string, Replacement> = {};
  for (let i = 0; i < result.residues.length; i++) {
    const label = result.residues[i];
    const residue: any = {
      value: label,
      results: {
        begin: [],
        end: [],
      },
      fromBegin: i + 1,
      fromEnd: result.residues.length - i,
      kind: 'residue',
    };
    if (label.includes('(')) {
      getModifiedReplacement(label, residue, alternatives, replacements);
    } else if (groupsObject[label]?.oneLetter) {
      residue.label = groupsObject[label].oneLetter;
    } else {
      getUnknownReplacement(label, residue, replacements);
    }
    result.residues[i] = residue;
  }
  result.begin = removeStartEndParenthesis(result.begin);
  result.end = removeStartEndParenthesis(result.end);
  if (result.begin.length > 2) {
    const label = options.kind === 'peptide' ? 'Nter' : "5'";
    replacements[result.begin] = { label };
    result.begin = label;
  }
  if (result.end.length > 2) {
    const label = options.kind === 'peptide' ? 'Cter' : "3'";
    replacements[result.end] = { label };
    result.end = label;
  }

  result.begin = { label: result.begin, kind: 'begin' };
  result.end = { label: result.end, kind: 'end' };
  result.alternatives = alternatives;
  result.replacements = replacements;

  result.all = [result.begin, ...result.residues, result.end];

  for (const entry of result.all) {
    entry.info = {
      nbOver: 0,
      nbUnder: 0,
    };
  }

  data.residues = result;
}

/**
 * Assign an unknown residue a placeholder symbol and register it in `replacements`.
 * @param unknownResidue - The raw residue code.
 * @param residue - Residue object to mutate with label + replaced flag.
 * @param replacements - Replacement map shared across the whole sequence.
 */
function getUnknownReplacement(
  unknownResidue: string,
  residue: any,
  replacements: Record<string, Replacement>,
): void {
  if (!replacements[unknownResidue]) {
    replacements[unknownResidue] = {
      label: SYMBOLS[currentSymbol] || '?',
      id: unknownResidue,
    };
    currentSymbol++;
  }
  residue.replaced = true;
  residue.label = replacements[unknownResidue].label;
}

/**
 * Assign a modified residue (e.g. `Ala(OMe)`) an alternative one-letter code,
 * or fall back to an unknown replacement.
 * @param modifiedResidue - The raw modified residue code.
 * @param residue - Residue object to mutate with label + replaced flag.
 * @param alternatives - Per-alternative letter counters shared across the sequence.
 * @param replacements - Replacement map shared across the sequence.
 */
function getModifiedReplacement(
  modifiedResidue: string,
  residue: any,
  alternatives: Record<string, { count: number }>,
  replacements: Record<string, Replacement>,
): void {
  if (!replacements[modifiedResidue]) {
    const position = modifiedResidue.indexOf('(');
    const residueCode = modifiedResidue.slice(0, Math.max(0, position));
    const modification = removeStartEndParenthesis(
      modifiedResidue.slice(Math.max(0, position)),
    );

    if (groupsObject[residueCode]?.alternativeOneLetter) {
      const alternativeOneLetter =
        groupsObject[residueCode].alternativeOneLetter;

      if (!alternatives[alternativeOneLetter]) {
        alternatives[alternativeOneLetter] = { count: 1 };
      } else {
        alternatives[alternativeOneLetter].count++;
      }
      replacements[modifiedResidue] = {
        label: `${ALTERNATIVES[alternatives[alternativeOneLetter].count - 1]}${alternativeOneLetter}`,
        residue: residueCode,
        modification,
      };
    } else {
      getUnknownReplacement(modifiedResidue, residue, replacements);
    }
  }
  residue.replaced = true;
  residue.label = replacements[modifiedResidue].label;
}

/**
 * Strip a single pair of enclosing parentheses from a molecular formula.
 * @param mf - Molecular formula that may be wrapped in parentheses.
 * @returns The formula without its outer parentheses, if any.
 */
function removeStartEndParenthesis(mf: string): string {
  if (mf.startsWith('(') && mf.at(-1) === ')') {
    return mf.slice(1, -1);
  }
  return mf;
}
