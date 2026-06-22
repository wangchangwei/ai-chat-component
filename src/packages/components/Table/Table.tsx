import * as React from "react";
import { Button } from "../ui/Button.js";
import { Checkbox as CheckboxUI } from "../ui/Checkbox.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { TableProps, TableValue } from "../../core/schema/table.js";
import { defaultTheme } from "../../core/theme/classes.js";

/**
 * Table — display tabular data with optional row selection.
 *
 * `rowSelection`: "single" | "multiple" | "none"
 */
export function TableView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
  theme = defaultTheme,
}: UIRenderProps<TableProps, TableValue>) {
  const t = theme;
  const sel = props.rowSelection ?? "none";
  const multi = sel === "multiple";
  const single = sel === "single";

  const [internalSingle, setInternalSingle] = React.useState<string | undefined>(
    (value as string | undefined) ?? undefined,
  );
  const [internalMulti, setInternalMulti] = React.useState<string[]>(
    (value as string[] | undefined) ?? [],
  );

  function toggleRow(id: string) {
    if (single) {
      setInternalSingle(id);
      onChange(id);
      onSubmit(id);
    } else if (multi) {
      const next = internalMulti.includes(id)
        ? internalMulti.filter((x) => x !== id)
        : [...internalMulti, id];
      setInternalMulti(next);
      onChange(next);
    }
  }

  function submitMulti() {
    onSubmit(internalMulti);
  }

  return (
    <section className={`aui-table ${t.card}`}>
      <header className={t.header}>
        <h3 className={t.title}>{props.title}</h3>
        {props.description && (
          <p className={t.description}>{props.description}</p>
        )}
      </header>
      <div className={t.tableWrapper}>
        <table className={t.tableBase}>
          <thead>
            <tr className="border-b text-left">
              {multi && <th className="w-8 py-2"></th>}
              {props.columns.map((c) => (
                <th key={c.key} className={t.tableHead}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rows.length === 0 && (
              <tr>
                <td
                  colSpan={props.columns.length + (multi ? 1 : 0)}
                  className={t.tableEmpty}
                >
                  No rows.
                </td>
              </tr>
            )}
            {props.rows.map((row) => {
              const selected = single
                ? internalSingle === row.id
                : multi
                  ? internalMulti.includes(row.id)
                  : false;
              return (
                <tr
                  key={row.id}
                  className={cn(
                    t.tableRow,
                    (single || multi) && t.tableRowInteractive,
                    selected && t.tableRowSelected,
                  )}
                  onClick={() => (single || multi) && toggleRow(row.id)}
                >
                  {multi && (
                    <td className="py-2 pr-2" onClick={(e) => e.stopPropagation()}>
                      <CheckboxUI
                        checked={selected}
                        onCheckedChange={() => toggleRow(row.id)}
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                  )}
                  {props.columns.map((c) => (
                    <td key={c.key} className={t.tableCell}>
                      {formatCell(row[c.key])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
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

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}
