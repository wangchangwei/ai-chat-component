import * as React from "react";
import { Checkbox as CheckboxUI } from "../ui/Checkbox.js";
import { Label } from "../ui/Label.js";
import { Button } from "../ui/Button.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { CheckboxProps, CheckboxValue } from "../../core/schema/checkbox.js";

/**
 * Checkbox — multi-choice picker.
 *
 * User can select 0..N options and must click "Submit" to confirm.
 */
export function CheckboxView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
}: UIRenderProps<CheckboxProps, CheckboxValue>) {
  const [internal, setInternal] = React.useState<string[]>(
    value ?? props.defaultValue ?? [],
  );

  function toggle(v: string, on: boolean) {
    const next = on ? Array.from(new Set([...internal, v])) : internal.filter((x) => x !== v);
    setInternal(next);
    onChange(next);
  }

  const min = props.min ?? 0;
  const max = props.max ?? props.options.length;
  const canSubmit = internal.length >= min && internal.length <= max;

  function submit() {
    if (canSubmit) onSubmit(internal);
  }

  return (
    <section className="aui-checkbox rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
        )}
        {(min > 0 || max < props.options.length) && (
          <p className="mt-1 text-xs text-muted-foreground">
            Choose {min === max ? min : `${min}–${max}`} option
            {max === 1 ? "" : "s"}.
          </p>
        )}
      </header>
      <div className="flex flex-col gap-2">
        {props.options.map((opt) => {
          const checked = internal.includes(opt.value);
          const optId = `cb-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                "flex items-start gap-3 rounded-md border border-input p-3 cursor-pointer transition-colors",
                "hover:bg-accent/50",
                checked && "border-primary bg-primary/5",
              )}
            >
              <CheckboxUI
                id={optId}
                checked={checked}
                onCheckedChange={(on) => toggle(opt.value, on)}
                aria-label={opt.label}
              />
              <div className="flex-1">
                <Label htmlFor={optId} className="cursor-pointer">
                  {opt.label}
                </Label>
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
      <footer className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={submit} disabled={!canSubmit}>
          Submit
        </Button>
      </footer>
    </section>
  );
}
