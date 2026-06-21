import { z } from "zod";
export declare const cardItemSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
}, z.core.$strip>;
export type CardItem = z.infer<typeof cardItemSchema>;
export declare const cardPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
    }, z.core.$strip>>;
    selectable: z.ZodOptional<z.ZodBoolean>;
    multi: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CardProps = z.infer<typeof cardPropsSchema>;
export declare const cardValueSchema: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
export type CardValue = z.infer<typeof cardValueSchema>;
