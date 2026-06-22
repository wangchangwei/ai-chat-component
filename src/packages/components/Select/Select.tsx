import * as React from "react";
import { Select as SelectUI } from "../ui/Select.js";
import { Label } from "../ui/Label.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { SelectProps, SelectValue } from "../../core/schema/select.js";
import { defaultTheme } from "../../core/theme/classes.js";

/**
 * Select — single-choice dropdown. User confirms with Submit.
 */
export function SelectView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
  theme = defaultTheme,
}: UIRenderProps<SelectProps, SelectValue>) {
  const t = theme;
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
    <section className={`aui-select ${t.card}`}>
      <header className={t.header}>
        <h3 className={t.title}>{props.title}</h3>
        {props.description && (
          <p className={t.description}>{props.description}</p>
        )}
      </header>
      <div className={t.fieldGap}>
        <Label htmlFor={id}>Value</Label>
        <SelectUI
          id={id}
          value={internal}
          onChange={pick}
          options={props.options}
          placeholder={props.placeholder ?? "Select an option"}
          className={t.selectTrigger}
        />
      </div>
      <footer className={t.footer}>
        {!internal && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button size="sm" onClick={() => internal && onSubmit(internal)} disabled={!canSubmit || !internal}>
          Submit
        </Button>
      </footer>
    </section>
  );
}
