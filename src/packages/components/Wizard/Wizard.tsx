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
}: UIRenderProps<WizardProps, WizardValue>) {
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
    <section className="aui-wizard rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
        )}
      </header>

      <WizardStepper steps={props.steps} current={stepIdx} />

      <div className="mt-4">
        <h4 className="text-sm font-semibold">
          Step {stepIdx + 1}: {step.title}
        </h4>
        {step.description && (
          <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
        )}
        <div className="mt-3 space-y-4">
          {step.fields.map((field) => {
            const id = `wiz-${field.name}`;
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={id}>{field.label}</Label>
                <FormFieldControl field={field} id={id} value={values[field.name]} onChange={(v: unknown) => set(field.name, v)} />
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mt-6 flex justify-between gap-2">
        <div className="flex gap-2">
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
}: {
  steps: WizardStep[];
  current: number;
}) {
  return (
    <ol className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
      {steps.map((s, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li
            key={s.id}
            className={cn(
              "flex items-center gap-2 text-xs whitespace-nowrap",
              active && "font-semibold",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border",
                done && "bg-primary text-primary-foreground border-primary",
                active && !done && "border-primary",
                !active && !done && "border-input text-muted-foreground",
              )}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span>{s.title}</span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-muted-foreground">
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
}: {
  field: FormField;
  id: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
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
        <div className="flex items-center gap-3 pt-1">
          <Switch
            id={id}
            checked={Boolean(value)}
            onCheckedChange={(v) => onChange(v)}
          />
          {field.description && (
            <span className="text-xs text-muted-foreground">{field.description}</span>
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
        <div className="flex flex-col gap-2">
          {field.options.map((opt) => {
            const checked = arr.includes(opt.value);
            return (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
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
        />
      );
  }
}
