import { z } from "zod";

export const uploadPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  accept: z.string().optional(),
  multiple: z.boolean().optional(),
  maxSize: z.number().int().positive().optional(),
  required: z.boolean().optional(),
});

export type UploadProps = z.infer<typeof uploadPropsSchema>;

/**
 * Upload value is an array of file metadata objects. Files are not embedded
 * in JSON; only metadata is. Use `dataUri` for inline payloads (e.g. images).
 */
export const uploadFileSchema = z.object({
  name: z.string(),
  size: z.number().int().nonnegative(),
  type: z.string(),
  dataUri: z.string().optional(),
});

export type UploadFile = z.infer<typeof uploadFileSchema>;

export const uploadValueSchema = z.array(uploadFileSchema);

export type UploadValue = z.infer<typeof uploadValueSchema>;
