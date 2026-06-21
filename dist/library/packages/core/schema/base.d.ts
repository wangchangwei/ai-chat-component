import { z } from "zod";
/**
 * Common option shape used by Radio, Checkbox, Select.
 */
export declare const optionSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
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
export declare function makeUIAction<P>(action: UIAction<P>): UIAction<P>;
