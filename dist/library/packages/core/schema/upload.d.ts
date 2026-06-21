import { z } from "zod";
export declare const uploadPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    accept: z.ZodOptional<z.ZodString>;
    multiple: z.ZodOptional<z.ZodBoolean>;
    maxSize: z.ZodOptional<z.ZodNumber>;
    required: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type UploadProps = z.infer<typeof uploadPropsSchema>;
/**
 * Upload value is an array of file metadata objects. Files are not embedded
 * in JSON; only metadata is. Use `dataUri` for inline payloads (e.g. images).
 */
export declare const uploadFileSchema: z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    type: z.ZodString;
    dataUri: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UploadFile = z.infer<typeof uploadFileSchema>;
export declare const uploadValueSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    type: z.ZodString;
    dataUri: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export type UploadValue = z.infer<typeof uploadValueSchema>;
