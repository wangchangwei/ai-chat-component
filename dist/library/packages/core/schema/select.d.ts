import { z } from "zod";
export declare const selectPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    options: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    defaultValue: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    searchable: z.ZodOptional<z.ZodBoolean>;
    required: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type SelectProps = z.infer<typeof selectPropsSchema>;
export declare const selectValueSchema: z.ZodString;
export type SelectValue = z.infer<typeof selectValueSchema>;
