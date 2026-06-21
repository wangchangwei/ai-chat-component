import * as React from "react";
export interface RadioOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    value: string | undefined;
    onChange: (value: string) => void;
    options: RadioOption[];
    name?: string;
    id?: string;
}
/**
 * Minimal accessible radio group. Native radios with custom styling.
 */
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
