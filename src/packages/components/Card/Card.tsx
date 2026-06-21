import * as React from "react";
import { Card as CardUI, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card.js";
import { Button } from "../ui/Button.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { CardProps, CardValue } from "../../core/schema/card.js";

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
}: UIRenderProps<CardProps, CardValue>) {
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
    <section className="aui-card rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
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
                "text-left transition-all",
                props.selectable && "cursor-pointer hover:shadow-md",
                !props.selectable && "cursor-default",
              )}
            >
              <CardUI
                className={cn(
                  "h-full",
                  selected && "ring-2 ring-primary border-primary",
                )}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-video w-full rounded-t-lg object-cover bg-muted"
                  />
                )}
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  {item.description && (
                    <CardDescription>{item.description}</CardDescription>
                  )}
                </CardHeader>
                {item.meta && Object.keys(item.meta).length > 0 && (
                  <CardContent className="pt-0">
                    <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                      {Object.entries(item.meta).map(([k, v]) => (
                        <React.Fragment key={k}>
                          <dt className="text-muted-foreground">{k}</dt>
                          <dd className="font-medium">{String(v)}</dd>
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
        <footer className="mt-4 flex justify-end gap-2">
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
