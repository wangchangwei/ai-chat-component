import * as React from "react";
export interface SwitchProps {
    checked: boolean;
    onCheckedChange: (next: boolean) => void;
    disabled?: boolean;
    id?: string;
    "aria-label"?: string;
}
/** Minimal accessible Switch (no Radix dependency). */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
