import { z } from "zod";
export declare const confirmPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    confirmLabel: z.ZodOptional<z.ZodString>;
    cancelLabel: z.ZodOptional<z.ZodString>;
    variant: z.ZodOptional<z.ZodEnum<{
        default: "default";
        destructive: "destructive";
    }>>;
}, z.core.$strip>;
export type ConfirmProps = z.infer<typeof confirmPropsSchema>;
export declare const confirmValueSchema: z.ZodBoolean;
export type ConfirmValue = z.infer<typeof confirmValueSchema>;
