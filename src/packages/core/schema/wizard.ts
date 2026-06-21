import { z } from "zod";
import { formFieldSchema } from "./form.js";

export const wizardStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(formFieldSchema).min(1),
});

export type WizardStep = z.infer<typeof wizardStepSchema>;

export const wizardPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  steps: z.array(wizardStepSchema).min(1),
  allowSkip: z.boolean().optional(),
  submitLabel: z.string().optional(),
});

export type WizardProps = z.infer<typeof wizardPropsSchema>;

export const wizardValueSchema = z.object({
  currentStep: z.number().int().nonnegative(),
  values: z.record(z.string(), z.unknown()),
});

export type WizardValue = z.infer<typeof wizardValueSchema>;
