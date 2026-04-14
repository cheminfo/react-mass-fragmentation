import type { CSSProperties, JSX } from 'react';

import type { SequenceSVGOptions } from '../src/types.js';

interface ControlsProps {
  /** Current options. */
  options: SequenceSVGOptions;
  /** Called whenever the user tweaks an input. */
  onChange: (options: SequenceSVGOptions) => void;
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px 20px',
  padding: 8,
  marginBottom: 8,
  borderRadius: 4,
  background: '#f5f5f5',
  fontFamily: 'sans-serif',
  fontSize: 12,
};

const fieldStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 180,
};

const labelStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 2,
  color: '#555',
};

/**
 * Interactive controls panel for a `MassFragmentation` component: sliders for
 * numeric options and checkboxes for boolean options.
 * @param props - Component props.
 * @param props.options - Current options.
 * @param props.onChange - Called whenever the user tweaks an input.
 * @returns The controls panel.
 */
export function Controls({ options, onChange }: ControlsProps): JSX.Element {
  const filter = options.filter ?? {};
  const merge = options.merge ?? {};

  return (
    <div style={containerStyle}>
      <Slider
        label="Width"
        value={options.width ?? 600}
        min={200}
        max={1400}
        step={10}
        onChange={(width) => onChange({ ...options, width })}
      />
      <Slider
        label="Left/Right borders"
        value={options.leftRightBorders ?? 50}
        min={0}
        max={200}
        step={5}
        onChange={(leftRightBorders) =>
          onChange({ ...options, leftRightBorders })
        }
      />
      <Slider
        label="Residue spacing"
        value={options.spaceBetweenResidues ?? 30}
        min={10}
        max={80}
        step={1}
        onChange={(spaceBetweenResidues) =>
          onChange({ ...options, spaceBetweenResidues })
        }
      />
      <Slider
        label="Internal line spacing"
        value={options.spaceBetweenInternalLines ?? 12}
        min={4}
        max={30}
        step={1}
        onChange={(spaceBetweenInternalLines) =>
          onChange({ ...options, spaceBetweenInternalLines })
        }
      />
      <Slider
        label="Stroke width"
        value={options.strokeWidth ?? 2}
        min={1}
        max={6}
        step={1}
        onChange={(strokeWidth) => onChange({ ...options, strokeWidth })}
      />
      <Slider
        label="Label size"
        value={options.labelSize ?? 12}
        min={6}
        max={24}
        step={1}
        onChange={(labelSize) => onChange({ ...options, labelSize })}
      />
      <Slider
        label="Min similarity"
        value={filter.minSimilarity ?? 0}
        min={0}
        max={1}
        step={0.05}
        onChange={(minSimilarity) =>
          onChange({ ...options, filter: { ...filter, minSimilarity } })
        }
      />
      <Slider
        label="Min relative quantity"
        value={filter.minRelativeQuantity ?? 0}
        min={0}
        max={1}
        step={0.05}
        onChange={(minRelativeQuantity) =>
          onChange({ ...options, filter: { ...filter, minRelativeQuantity } })
        }
      />
      <Checkbox
        label="Show internals"
        checked={filter.showInternals ?? true}
        onChange={(showInternals) =>
          onChange({ ...options, filter: { ...filter, showInternals } })
        }
      />
      <Checkbox
        label="Merge by charge"
        checked={merge.charge ?? false}
        onChange={(charge) =>
          onChange({ ...options, merge: { ...merge, charge } })
        }
      />
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

/**
 * A labelled range slider displaying its current value.
 * @param props - Component props.
 * @param props.label - Label text shown above the slider.
 * @param props.value - Current numeric value.
 * @param props.min - Minimum value.
 * @param props.max - Maximum value.
 * @param props.step - Step between two slider positions.
 * @param props.onChange - Called with the new value whenever the slider moves.
 * @returns The rendered slider.
 */
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: SliderProps): JSX.Element {
  return (
    <label style={fieldStyle}>
      <span style={labelStyle}>
        <span>{label}</span>
        <span>{formatValue(value, step)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * A labelled checkbox input.
 * @param props - Component props.
 * @param props.label - Label text shown next to the checkbox.
 * @param props.checked - Whether the checkbox is ticked.
 * @param props.onChange - Called with the new checked state.
 * @returns The rendered checkbox.
 */
function Checkbox({ label, checked, onChange }: CheckboxProps): JSX.Element {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: '#555',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}

/**
 * Format a numeric value so integer steps render without decimals and
 * fractional steps show a fixed number of digits.
 * @param value - Value to format.
 * @param step - Slider step; used to infer precision.
 * @returns The formatted value as a string.
 */
function formatValue(value: number, step: number): string {
  if (Number.isInteger(step)) return String(value);
  const digits = Math.max(0, -Math.floor(Math.log10(step)));
  return value.toFixed(digits);
}
