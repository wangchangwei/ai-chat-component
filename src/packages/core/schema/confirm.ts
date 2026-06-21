import { z } from "zod";

export const confirmPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  confirmLabel: z.string().optional(),
  cancelLabel: z.string().optional(),
  variant: z.enum(["default", "destructive"]).optional(),
});

export type ConfirmProps = z.infer<typeof confirmPropsSchema>;

export const confirmValueSchema = z.boolean();

export type ConfirmValue = z.infer<typeof confirmValueSchema>;
