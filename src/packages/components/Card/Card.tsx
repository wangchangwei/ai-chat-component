import * as React from "react";
import { Card as CardUI, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card.js";
import { Button } from "../ui/Button.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { CardProps, CardValue } from "../../core/schema/card.js";
import { defaultTheme } from "../../core/theme/classes.js";

/**
 * Card — list of structured items. When `selectable`, lets the user pick one
 * (or many when `multi`).
 */
export function CardView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
  theme = defaultTheme,
}: UIRenderProps<CardProps, CardValue>) {
  const t = theme;
  const multi = props.selectable && props.multi;
  const single = props.selectable && !props.multi;

  const [internalSingle, setInternalSingle] = React.useState<string | undefined>(
    (value as string | undefined) ?? undefined,
  );
  const [internalMulti, setInternalMulti] = React.useState<string[]>(
    (value as string[] | undefined) ?? [],
  );

  function toggle(v: string) {
    if (single) {
      setInternalSingle(v);
      onChange(v);
      onSubmit(v);
    } else if (multi) {
      const next = internalMulti.includes(v)
        ? internalMulti.filter((x) => x !== v)
        : [...internalMulti, v];
      setInternalMulti(next);
      onChange(next);
    }
  }

  function submitMulti() {
    onSubmit(internalMulti);
  }

  return (
    <section className={`aui-card ${t.card}`}>
      <header className={t.header}>
        <h3 className={t.title}>{props.title}</h3>
        {props.description && (
          <p className={t.description}>{props.description}</p>
        )}
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {props.items.map((item) => {
          const selected = single
            ? internalSingle === item.id
            : multi
              ? internalMulti.includes(item.id)
              : false;
          return (
            <button
              key={item.id}
              type="button"
              disabled={!props.selectable}
              onClick={() => props.selectable && toggle(item.id)}
              className={cn(
                t.cardItemButton,
                props.selectable ? t.cardItemButtonSelectable : t.cardItemButtonDisabled,
              )}
            >
              <CardUI
                className={cn(t.cardItem, selected && t.cardItemSelected)}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={t.cardImage}
                  />
                )}
                <CardHeader className={t.cardHeader}>
                  <CardTitle className={t.cardTitle}>{item.title}</CardTitle>
                  {item.description && (
                    <CardDescription className={t.cardDescription}>{item.description}</CardDescription>
                  )}
                </CardHeader>
                {item.meta && Object.keys(item.meta).length > 0 && (
                  <CardContent className="pt-0">
                    <dl className={t.cardMetaGrid}>
                      {Object.entries(item.meta).map(([k, v]) => (
                        <React.Fragment key={k}>
                          <dt className={t.cardMetaKey}>{k}</dt>
                          <dd className={t.cardMetaValue}>{String(v)}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  </CardContent>
                )}
              </CardUI>
            </button>
          );
        })}
      </div>
      {multi && (
        <footer className={t.footer}>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={submitMulti} disabled={internalMulti.length === 0}>
            Submit
          </Button>
        </footer>
      )}
    </section>
  );
}
