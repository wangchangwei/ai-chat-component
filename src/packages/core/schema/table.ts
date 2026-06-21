import { z } from "zod";

export const tableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(["string", "number", "boolean", "date"]).optional(),
});

export type TableColumn = z.infer<typeof tableColumnSchema>;

export const tableRowSchema = z
  .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
  .and(z.object({ id: z.string() }));

export type TableRow = z.infer<typeof tableRowSchema>;

export const tablePropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  columns: z.array(tableColumnSchema).min(1),
  rows: z.array(tableRowSchema),
  rowSelection: z.enum(["none", "single", "multiple"]).optional(),
  pageSize: z.number().int().positive().optional(),
});

export type TableProps = z.infer<typeof tablePropsSchema>;

export const tableValueSchema = z.union([z.string(), z.array(z.string())]);

export type TableValue = z.infer<typeof tableValueSchema>;
