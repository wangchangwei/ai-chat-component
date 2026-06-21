import { z } from "zod";
export declare const radioPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    options: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    defaultValue: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    submitLabel: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RadioProps = z.infer<typeof radioPropsSchema>;
export declare const radioValueSchema: z.ZodString;
export type RadioValue = z.infer<typeof radioValueSchema>;
