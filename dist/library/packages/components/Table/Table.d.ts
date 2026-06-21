import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { TableProps, TableValue } from "../../core/schema/table.js";
/**
 * Table — display tabular data with optional row selection.
 *
 * `rowSelection`: "single" | "multiple" | "none"
 */
export declare function TableView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<TableProps, TableValue>): React.JSX.Element;
