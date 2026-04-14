export interface SequenceSVGOptions {
  /**
   * Space, in pixels, between the left/right borders and the first/last residue.
   * @default 50
   */
  leftRightBorders?: number;

  /**
   * Total width of the rendered SVG, in pixels.
   * @default 600
   */
  width?: number;

  /**
   * Horizontal space, in pixels, between two residues.
   * @default 30
   */
  spaceBetweenResidues?: number;

  /**
   * Vertical space, in pixels, between two internal fragment lines.
   * @default 12
   */
  spaceBetweenInternalLines?: number;

  /**
   * Stroke width used for fragment and internal lines.
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Font family used to render labels.
   * @default 'Verdana'
   */
  labelFontFamily?: string;

  /**
   * Font size used to render labels.
   * @default 12
   */
  labelSize?: number;

  /**
   * Sequence parsing options forwarded to `appendResidues`.
   */
  parsing?: ParsingOptions;

  /**
   * Options controlling how similar results are merged together.
   */
  merge?: MergeOptions;

  /**
   * Options controlling how results are filtered out before rendering.
   */
  filter?: FilterOptions;
}

/**
 * Options after default values have been filled in.
 */
export type ResolvedOptions = Required<
  Omit<SequenceSVGOptions, 'parsing' | 'merge' | 'filter'>
> & {
  parsing: ParsingOptions;
  merge: MergeOptions;
  filter: FilterOptions;
};

export interface ParsingOptions {
  /**
   * Kind of biopolymer. Defaults to `rna` if the sequence contains `U`,
   * otherwise `ds-dna`. For peptides, the caller must pass `'peptide'` explicitly.
   */
  kind?: 'peptide' | 'rna' | 'ds-dna' | 'dna';

  /**
   * Five-prime end group for nucleotides.
   * @default 'monophosphate'
   */
  fivePrime?: 'alcohol' | 'monophosphate' | 'diphosphate' | 'triphosphate';

  /**
   * Whether the sequence is circular.
   * @default false
   */
  circular?: boolean;
}

export interface MergeOptions {
  /**
   * Merge results that only differ by a charge.
   */
  charge?: boolean;
}

export interface FilterOptions {
  /**
   * Minimum similarity below which results are filtered out.
   * @default 0
   */
  minSimilarity?: number;

  /**
   * Minimum quantity below which results are filtered out.
   * @default 0
   */
  minQuantity?: number;

  /**
   * Minimum relative quantity. Value between 0 and 1 that supersedes `minQuantity`.
   * @default 0
   */
  minRelativeQuantity?: number;

  /**
   * Whether to display internal fragments.
   * @default true
   */
  showInternals?: boolean;
}

/**
 * Raw analysis result entry as provided by the caller of `sequenceSVG`.
 */
export interface AnalysisResult {
  /** Fragment type label (e.g. `b3`, `y4`, `b38y33`). */
  type: string;
  /** Similarity score between 0 and 1. */
  similarity: number;
  /** Charge as a number, or empty string when merged by charge. */
  charge: number | string;
  /** Optional total quantity used when filtering by quantity. */
  quantity?: number;
}

/**
 * One member inside a grouped fragment / internal result.
 */
export interface ResultMember {
  type: string;
  charge: number | string;
  similarity: number;
  textColor: string;
}

/**
 * A terminal fragment (starting from begin or end of the sequence).
 */
export interface Fragment {
  position: number;
  fromBegin?: boolean;
  fromEnd?: boolean;
  color: string;
  members: ResultMember[];
}

/**
 * An internal fragment covering a range `[from, to]` of residues.
 */
export interface Internal {
  from: number;
  to: number;
  color: string;
  members: ResultMember[];
}

export interface Residue {
  value: string;
  label: string;
  kind: 'residue' | 'begin' | 'end';
  fromBegin: number;
  fromEnd: number;
  replaced?: boolean;
  results: { begin: unknown[]; end: unknown[] };
  info: { nbOver: number; nbUnder: number };
}

export interface Replacement {
  label: string;
  id?: string;
  residue?: string;
  modification?: string;
}

export interface Residues {
  begin: Residue;
  end: Residue;
  residues: Residue[];
  all: Residue[];
  alternatives: Record<string, { count: number }>;
  replacements: Record<string, Replacement>;
}

export interface LineData {
  from: number;
  to: number;
  residues: Residue[];
  fragments: Fragment[];
  internals: Internal[];
  heightBelow: number;
  heightAbove: number;
  totalheightAbove: number;
  y: number;
}

export interface Legend {
  y: number;
  labels: string[];
}

export interface MassFragmentationData {
  residues: Residues;
  results: { fragments: Fragment[]; internals: Internal[] };
  lines: LineData[];
  height: number;
  legend?: Legend;
}
