import * as React from "react";
export interface SelectProps {
    value: string | undefined;
    onChange: (value: string) => void;
    options: {
        label: string;
        value: string;
        disabled?: boolean;
    }[];
    placeholder?: string;
    disabled?: boolean;
    id?: string;
}
/**
 * Minimal accessible Select backed by a native <select> element.
 * Provides full keyboard navigation, screen-reader support, and zero
 * external dependencies. For richer UX, swap in a Radix-based primitive.
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
