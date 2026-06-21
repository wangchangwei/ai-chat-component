import { z } from "zod";
export declare const wizardStepSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    fields: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"input">;
        name: z.ZodString;
        label: z.ZodString;
        placeholder: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"textarea">;
        name: z.ZodString;
        label: z.ZodString;
        placeholder: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        rows: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"number">;
        name: z.ZodString;
        label: z.ZodString;
        defaultValue: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        step: z.ZodOptional<z.ZodNumber>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"switch">;
        name: z.ZodString;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"radio">;
        name: z.ZodString;
        label: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
        }, z.core.$strip>>;
        defaultValue: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"checkbox">;
        name: z.ZodString;
        label: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
        }, z.core.$strip>>;
        defaultValue: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"select">;
        name: z.ZodString;
        label: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
        }, z.core.$strip>>;
        defaultValue: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;
export type WizardStep = z.infer<typeof wizardStepSchema>;
export declare const wizardPropsSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    steps: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        fields: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"input">;
            name: z.ZodString;
            label: z.ZodString;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodString>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"textarea">;
            name: z.ZodString;
            label: z.ZodString;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodString>;
            required: z.ZodOptional<z.ZodBoolean>;
            rows: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"number">;
            name: z.ZodString;
            label: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodNumber>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            step: z.ZodOptional<z.ZodNumber>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"switch">;
            name: z.ZodString;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"radio">;
            name: z.ZodString;
            label: z.ZodString;
            options: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodString;
            }, z.core.$strip>>;
            defaultValue: z.ZodOptional<z.ZodString>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"checkbox">;
            name: z.ZodString;
            label: z.ZodString;
            options: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodString;
            }, z.core.$strip>>;
            defaultValue: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"select">;
            name: z.ZodString;
            label: z.ZodString;
            options: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodString;
            }, z.core.$strip>>;
            defaultValue: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            required: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>>;
    allowSkip: z.ZodOptional<z.ZodBoolean>;
    submitLabel: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type WizardProps = z.infer<typeof wizardPropsSchema>;
export declare const wizardValueSchema: z.ZodObject<{
    currentStep: z.ZodNumber;
    values: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
export type WizardValue = z.infer<typeof wizardValueSchema>;
