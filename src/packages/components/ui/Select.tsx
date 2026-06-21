import * as React from "react";
import { cn } from "../../../lib/utils.js";

export interface SelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

/**
 * Minimal accessible Select backed by a native <select> element.
 * Provides full keyboard navigation, screen-reader support, and zero
 * external dependencies. For richer UX, swap in a Radix-based primitive.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onChange, options, placeholder, disabled, id }, ref) => (
    <select
      ref={ref}
      id={id}
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
);
Select.displayName = "Select";
