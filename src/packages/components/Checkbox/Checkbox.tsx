import * as React from "react";
import { Checkbox as CheckboxUI } from "../ui/Checkbox.js";
import { Label } from "../ui/Label.js";
import { Button } from "../ui/Button.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { CheckboxProps, CheckboxValue } from "../../core/schema/checkbox.js";
import { defaultTheme } from "../../core/theme/classes.js";

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
  theme = defaultTheme,
}: UIRenderProps<CheckboxProps, CheckboxValue>) {
  const t = theme;
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
    <section className={`aui-checkbox ${t.card}`}>
      <header className={t.header}>
        <h3 className={t.title}>{props.title}</h3>
        {props.description && (
          <p className={t.description}>{props.description}</p>
        )}
        {(min > 0 || max < props.options.length) && (
          <p className={t.description}>
            Choose {min === max ? min : `${min}–${max}`} option
            {max === 1 ? "" : "s"}.
          </p>
        )}
      </header>
      <div className={t.checkboxColumn}>
        {props.options.map((opt) => {
          const checked = internal.includes(opt.value);
          const optId = `cb-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(t.choiceRow, checked && t.choiceRowSelected)}
            >
              <CheckboxUI
                id={optId}
                checked={checked}
                onCheckedChange={(on) => toggle(opt.value, on)}
                aria-label={opt.label}
              />
              <div className="flex-1">
                <Label htmlFor={optId} className={t.choiceLabel}>
                  {opt.label}
                </Label>
                {opt.description && (
                  <div className={t.choiceDescription}>{opt.description}</div>
                )}
              </div>
            </label>
          );
        })}
      </div>
      <footer className={t.footer}>
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
