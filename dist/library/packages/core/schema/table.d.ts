import { z } from "zod";
export declare const tableColumnSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<{
        string: "string";
        number: "number";
        boolean: "boolean";
        date: "date";
    }>>;
}, z.core.$strip>;
export type TableColumn = z.infer<typeof tableColumnSchema>;
export declare const tableRowSchema: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>, z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>>;
export type TableRow = z.infer<typeof tableRowSchema>;
export declare const tablePropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    columns: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        type: z.ZodOptional<z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            date: "date";
        }>>;
    }, z.core.$strip>>;
    rows: z.ZodArray<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>, z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>>>;
    rowSelection: z.ZodOptional<z.ZodEnum<{
        none: "none";
        single: "single";
        multiple: "multiple";
    }>>;
    pageSize: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type TableProps = z.infer<typeof tablePropsSchema>;
export declare const tableValueSchema: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
export type TableValue = z.infer<typeof tableValueSchema>;
