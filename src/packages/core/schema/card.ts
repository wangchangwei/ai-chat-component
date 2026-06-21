import { z } from "zod";

/**
 * Image URL allowlist — blocks `javascript:` and `data:image/svg+xml` (which
 * can carry event handlers). Only `https:`, `http:`, and raster `data:` URIs
 * are accepted.
 */
const imageUrl = z
  .string()
  .url()
  .refine(
    (u) => {
      const lower = u.toLowerCase();
      if (lower.startsWith("https://") || lower.startsWith("http://")) return true;
      return /^data:image\/(png|jpe?g|gif|webp);/.test(lower);
    },
    { message: "image must be http(s) or a raster data URI" },
  );

export const cardItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image: imageUrl.optional(),
  meta: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export type CardItem = z.infer<typeof cardItemSchema>;

export const cardPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  items: z.array(cardItemSchema).min(1),
  selectable: z.boolean().optional(),
  multi: z.boolean().optional(),
});

export type CardProps = z.infer<typeof cardPropsSchema>;

export const cardValueSchema = z.union([z.string(), z.array(z.string())]);

export type CardValue = z.infer<typeof cardValueSchema>;
