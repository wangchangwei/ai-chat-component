import * as React from "react";
import { RadioGroup } from "../ui/RadioGroup.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { RadioProps, RadioValue } from "../../core/schema/radio.js";

/**
 * Radio — single-choice picker.
 *
 * If `submitLabel` is set, shows a submit button (manual confirmation).
 * Otherwise auto-submits on pick.
 */
export function RadioView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
}: UIRenderProps<RadioProps, RadioValue>) {
  const [internal, setInternal] = React.useState<string | undefined>(
    value ?? props.defaultValue,
  );

  const manual = !!props.submitLabel;

  function pick(v: string) {
    setInternal(v);
    onChange(v);
    if (!manual) onSubmit(v);
  }

  return (
    <section className="aui-radio rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
        )}
      </header>
      <RadioGroup value={internal} onChange={pick} options={props.options} />
      <footer className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="text-xs text-muted-foreground hover:underline"
          onClick={onCancel}
        >
          Cancel
        </button>
        {manual && (
          <Button
            size="sm"
            onClick={() => internal && onSubmit(internal)}
            disabled={!internal}
          >
            {props.submitLabel}
          </Button>
        )}
      </footer>
    </section>
  );
}
