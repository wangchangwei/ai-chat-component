import { z } from "zod";
export declare const checkboxPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    options: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    defaultValue: z.ZodOptional<z.ZodArray<z.ZodString>>;
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    required: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CheckboxProps = z.infer<typeof checkboxPropsSchema>;
export declare const checkboxValueSchema: z.ZodArray<z.ZodString>;
export type CheckboxValue = z.infer<typeof checkboxValueSchema>;
