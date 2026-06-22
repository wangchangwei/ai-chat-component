import * as React from "react";
import { Input } from "../ui/Input.js";
import { Textarea } from "../ui/Textarea.js";
import { Switch } from "../ui/Switch.js";
import { Checkbox as CheckboxUI } from "../ui/Checkbox.js";
import { RadioGroup } from "../ui/RadioGroup.js";
import { Select as SelectUI } from "../ui/Select.js";
import { Label } from "../ui/Label.js";
import { Button } from "../ui/Button.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type {
  WizardProps,
  WizardValue,
  WizardStep,
} from "../../core/schema/wizard.js";
import type { FormField } from "../../core/schema/form.js";
import { defaultTheme, type Theme } from "../../core/theme/classes.js";

function defaultForField(f: FormField): unknown {
  if ("defaultValue" in f && f.defaultValue !== undefined) return f.defaultValue;
  switch (f.type) {
    case "checkbox":
      return [];
    case "switch":
      return false;
    default:
      return "";
  }
}

/**
 * Wizard — multi-step form. Each step is a small Form. Final Submit emits
 * `{ currentStep, values }` so the agent knows which step the user reached.
 */
export function WizardView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
  theme = defaultTheme,
}: UIRenderProps<WizardProps, WizardValue>) {
  const t = theme;
  const initialStep = Math.min(
    Math.max(value?.currentStep ?? 0, 0),
    Math.max(props.steps.length - 1, 0),
  );
  const [stepIdx, setStepIdx] = React.useState<number>(initialStep);
  const [values, setValues] = React.useState<Record<string, unknown>>(() => {
    const seed: Record<string, unknown> = {};
    for (const step of props.steps) {
      for (const f of step.fields) {
        seed[f.name] =
          value?.values?.[f.name] !== undefined
            ? value.values[f.name]
            : defaultForField(f);
      }
    }
    return seed;
  });

  const step = props.steps[stepIdx];
  const isLast = stepIdx === props.steps.length - 1;
  const isFirst = stepIdx === 0;

  function set(name: string, v: unknown) {
    const next = { ...values, [name]: v };
    setValues(next);
    onChange({ currentStep: stepIdx, values: next });
  }

  function next() {
    if (isLast) {
      onSubmit({ currentStep: stepIdx, values });
    } else {
      const nextIdx = stepIdx + 1;
      setStepIdx(nextIdx);
      onChange({ currentStep: nextIdx, values });
    }
  }
  function back() {
    if (!isFirst) {
      const nextIdx = stepIdx - 1;
      setStepIdx(nextIdx);
      onChange({ currentStep: nextIdx, values });
    }
  }

  return (
    <section className={`aui-wizard ${t.card}`}>
      <header className={t.header}>
        <h3 className={t.title}>{props.title}</h3>
        {props.description && (
          <p className={t.description}>{props.description}</p>
        )}
      </header>

      <WizardStepper steps={props.steps} current={stepIdx} theme={t} />

      <div className={t.stepBody}>
        <h4 className={t.stepHeading}>
          Step {stepIdx + 1}: {step.title}
        </h4>
        {step.description && (
          <p className={t.stepSubheading}>{step.description}</p>
        )}
        <div className={t.stepFieldsGap}>
          {step.fields.map((field) => {
            const id = `wiz-${field.name}`;
            return (
              <div key={field.name} className={t.fieldGap}>
                <Label htmlFor={id}>{field.label}</Label>
                <FormFieldControl field={field} id={id} value={values[field.name]} onChange={(v: unknown) => set(field.name, v)} theme={t} />
              </div>
            );
          })}
        </div>
      </div>

      <footer className={t.wizardFooter}>
        <div className={t.wizardFooterLeft}>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          {!isFirst && (
            <Button variant="outline" size="sm" onClick={back}>
              Back
            </Button>
          )}
        </div>
        <Button size="sm" onClick={next}>
          {isLast ? (props.submitLabel ?? "Finish") : "Next"}
        </Button>
      </footer>
    </section>
  );
}

function WizardStepper({
  steps,
  current,
  theme,
}: {
  steps: WizardStep[];
  current: number;
  theme: Theme;
}) {
  const t = theme;
  return (
    <ol className={t.stepList}>
      {steps.map((s, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li
            key={s.id}
            className={cn(t.stepRow, active && t.stepRowActive)}
          >
            <span
              className={cn(
                t.stepPill,
                done && t.stepPillDone,
                active && !done && t.stepPillActive,
              )}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span>{s.title}</span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className={t.stepArrow}>
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function FormFieldControl({
  field,
  id,
  value,
  onChange,
  theme,
}: {
  field: FormField;
  id: string;
  value: unknown;
  onChange: (v: unknown) => void;
  theme: Theme;
}) {
  const t = theme;
  switch (field.type) {
    case "input":
      return (
        <Input
          id={id}
          placeholder={field.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
    case "textarea":
      return (
        <Textarea
          id={id}
          rows={field.rows}
          placeholder={field.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
    case "number":
      return (
        <Input
          id={id}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step}
          value={(value as number | "") ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          required={field.required}
        />
      );
    case "switch":
      return (
        <div className={t.switchRow}>
          <Switch
            id={id}
            checked={Boolean(value)}
            onCheckedChange={(v) => onChange(v)}
          />
          {field.description && (
            <span className={t.choiceHelp}>{field.description}</span>
          )}
        </div>
      );
    case "radio":
      return (
        <RadioGroup
          id={id}
          value={(value as string) ?? undefined}
          onChange={(v) => onChange(v)}
          options={field.options}
        />
      );
    case "checkbox": {
      const arr = (Array.isArray(value) ? value : []) as string[];
      return (
        <div className={t.checkboxColumn}>
          {field.options.map((opt) => {
            const checked = arr.includes(opt.value);
            return (
              <label key={opt.value} className={t.checkboxItem}>
                <CheckboxUI
                  checked={checked}
                  onCheckedChange={(on) => {
                    const next = on
                      ? Array.from(new Set([...arr, opt.value]))
                      : arr.filter((x) => x !== opt.value);
                    onChange(next);
                  }}
                  aria-label={opt.label}
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      );
    }
    case "select":
      return (
        <SelectUI
          id={id}
          value={(value as string) ?? undefined}
          onChange={(v) => onChange(v)}
          options={field.options}
          placeholder={field.placeholder}
          className={t.selectTrigger}
        />
      );
  }
}
