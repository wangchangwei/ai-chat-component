import * as React from "react";
import { cn } from "../../../lib/utils.js";

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string | undefined;
  onChange: (value: string) => void;
  options: RadioOption[];
  name?: string;
  id?: string;
}

/**
 * Minimal accessible radio group. Native radios with custom styling.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onChange, options, name, id }, ref) => {
    const groupName = name ?? `radio-${React.useId()}`;
    return (
      <div ref={ref} id={id} role="radiogroup" className="flex flex-col gap-2">
        {options.map((opt) => {
          const optId = `${groupName}-${opt.value}`;
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                "flex items-start gap-3 rounded-md border border-input p-3 cursor-pointer transition-colors",
                "hover:bg-accent/50",
                checked && "border-primary bg-primary/5",
                opt.disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <input
                id={optId}
                type="radio"
                name={groupName}
                value={opt.value}
                checked={checked}
                disabled={opt.disabled}
                onChange={() => onChange(opt.value)}
                className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
              />
              <div className="flex-1">
                <div className="text-sm font-medium leading-none">{opt.label}</div>
                {opt.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {opt.description}
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    );
  },
);
RadioGroup.displayName = "RadioGroup";
