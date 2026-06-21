import { z } from "zod";
import { optionSchema } from "./base.js";

export const selectPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  options: z.array(optionSchema).min(1),
  defaultValue: z.string().optional(),
  placeholder: z.string().optional(),
  searchable: z.boolean().optional(),
  required: z.boolean().optional(),
});

export type SelectProps = z.infer<typeof selectPropsSchema>;

export const selectValueSchema = z.string();

export type SelectValue = z.infer<typeof selectValueSchema>;
