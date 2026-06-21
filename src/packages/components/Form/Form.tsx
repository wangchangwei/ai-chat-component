import * as React from "react";
import { Input } from "../ui/Input.js";
import { Textarea } from "../ui/Textarea.js";
import { Switch } from "../ui/Switch.js";
import { Checkbox as CheckboxUI } from "../ui/Checkbox.js";
import { RadioGroup } from "../ui/RadioGroup.js";
import { Select as SelectUI } from "../ui/Select.js";
import { Label } from "../ui/Label.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { FormProps, FormValue, FormField } from "../../core/schema/form.js";

function defaultForField(f: FormField): unknown {
  if ("defaultValue" in f && f.defaultValue !== undefined) return f.defaultValue;
  switch (f.type) {
    case "checkbox":
      return [];
    case "switch":
      return false;
    case "number":
      return "";
    default:
      return "";
  }
}

/**
 * Form — composed of typed fields. Submits a record of name → value.
 */
export function FormView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
}: UIRenderProps<FormProps, FormValue>) {
  const [internal, setInternal] = React.useState<Record<string, unknown>>(() => {
    const seed: Record<string, unknown> = {};
    for (const f of props.fields) {
      seed[f.name] =
        (value && value[f.name] !== undefined ? value[f.name] : defaultForField(f));
    }
    return seed;
  });

  function set(name: string, v: unknown) {
    const next = { ...internal, [name]: v };
    setInternal(next);
    onChange(next);
  }

  function submit() {
    // Validate required fields
    for (const f of props.fields) {
      if ("required" in f && f.required) {
        const v = internal[f.name];
        if (v === "" || v === undefined || v === null) return;
      }
    }
    onSubmit(internal);
  }

  return (
    <section className="aui-form rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
        )}
      </header>
      <div className="space-y-4">
        {props.fields.map((field) => {
          const id = `field-${field.name}`;
          return (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={id}>
                {field.label}
                {"required" in field && field.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
              <FormFieldControl field={field} id={id} value={internal[field.name]} onChange={(v) => set(field.name, v)} />
            </div>
          );
        })}
      </div>
      <footer className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          {props.cancelLabel ?? "Cancel"}
        </Button>
        <Button size="sm" onClick={submit}>
          {props.submitLabel ?? "Submit"}
        </Button>
      </footer>
    </section>
  );
}

interface FormFieldControlProps {
  field: FormField;
  id: string;
  value: unknown;
  onChange: (v: unknown) => void;
}

function FormFieldControl({ field, id, value, onChange }: FormFieldControlProps) {
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
              <label
                key={opt.value}
                className="flex items-center gap-2 text-sm"
              >
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
