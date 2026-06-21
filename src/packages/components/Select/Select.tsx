import * as React from "react";
import { Select as SelectUI } from "../ui/Select.js";
import { Label } from "../ui/Label.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { SelectProps, SelectValue } from "../../core/schema/select.js";

/**
 * Select — single-choice dropdown. User confirms with Submit.
 */
export function SelectView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
}: UIRenderProps<SelectProps, SelectValue>) {
  const [internal, setInternal] = React.useState<string | undefined>(
    value ?? props.defaultValue,
  );

  const id = React.useId();

  function pick(v: string) {
    setInternal(v);
    onChange(v);
  }

  const canSubmit = !props.required || Boolean(internal);

  return (
    <section className="aui-select rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
        )}
      </header>
      <div className="space-y-2">
        <Label htmlFor={id}>Value</Label>
        <SelectUI
          id={id}
          value={internal}
          onChange={pick}
          options={props.options}
          placeholder={props.placeholder ?? "Select an option"}
        />
      </div>
      <footer className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={() => internal && onSubmit(internal)} disabled={!canSubmit || !internal}>
          Submit
        </Button>
      </footer>
    </section>
  );
}
