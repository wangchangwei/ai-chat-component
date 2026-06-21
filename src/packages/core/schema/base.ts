import { z } from "zod";

/**
 * Common option shape used by Radio, Checkbox, Select.
 */
export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
  disabled: z.boolean().optional(),
});

export type Option = z.infer<typeof optionSchema>;

/**
 * Universal Business-UI action envelope.
 *
 * An agent emits one of these whenever it needs structured input from a human.
 * The renderer validates `props` against the registered Zod schema for `component`
 * before passing it to the React component.
 */
export interface UIAction<P = unknown> {
  component: string;
  props: P;
  id?: string;
  meta?: Record<string, unknown>;
}

/**
 * Builder for typed UIAction objects (helps when writing tests and example JSON).
 */
export function makeUIAction<P>(action: UIAction<P>): UIAction<P> {
  return action;
}
