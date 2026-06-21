import * as React from "react";
/**
 * Minimal Modal (no Radix) with a portal-free overlay. Used by Confirm and
 * can be used by any component that needs a dialog surface.
 */
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}
export declare function Modal({ open, onClose, title, description, children, footer, className, }: ModalProps): React.JSX.Element | null;
