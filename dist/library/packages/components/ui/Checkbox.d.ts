import * as React from "react";
export interface CheckboxProps {
    checked: boolean;
    onCheckedChange: (next: boolean) => void;
    disabled?: boolean;
    id?: string;
    "aria-label"?: string;
}
/** Minimal accessible Checkbox (no Radix dependency). */
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
