import { z } from "zod";
import { optionSchema } from "./base.js";

export const checkboxPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  options: z.array(optionSchema).min(1),
  defaultValue: z.array(z.string()).optional(),
  min: z.number().int().nonnegative().optional(),
  max: z.number().int().positive().optional(),
  required: z.boolean().optional(),
});

export type CheckboxProps = z.infer<typeof checkboxPropsSchema>;

export const checkboxValueSchema = z.array(z.string());

export type CheckboxValue = z.infer<typeof checkboxValueSchema>;
