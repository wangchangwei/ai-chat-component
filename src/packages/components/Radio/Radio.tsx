import * as React from "react";
import { RadioGroup } from "../ui/RadioGroup.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { RadioProps, RadioValue } from "../../core/schema/radio.js";
import { defaultTheme } from "../../core/theme/classes.js";

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
  theme = defaultTheme,
}: UIRenderProps<RadioProps, RadioValue>) {
  const t = theme;
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
    <section className={`aui-radio ${t.card}`}>
      <header className={t.header}>
        <h3 className={t.title}>{props.title}</h3>
        {props.description && (
          <p className={t.description}>{props.description}</p>
        )}
      </header>
      <RadioGroup value={internal} onChange={pick} options={props.options} />
      <footer className={t.footer}>
        {!internal && (
          <button
            type="button"
            className="text-xs text-muted-foreground hover:underline"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
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
