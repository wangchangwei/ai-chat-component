import { z } from "zod";
import { optionSchema } from "./base.js";

export const radioPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  options: z.array(optionSchema).min(2),
  defaultValue: z.string().optional(),
  required: z.boolean().optional(),
  /** Render a submit button instead of auto-submitting on pick */
  submitLabel: z.string().optional(),
});

export type RadioProps = z.infer<typeof radioPropsSchema>;

export const radioValueSchema = z.string();

export type RadioValue = z.infer<typeof radioValueSchema>;
