import * as React from "react";
import { cn } from "../../../lib/utils.js";

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
  /** Override the inner panel className */
  panelClassName?: string;
  /** Override the title className */
  titleClassName?: string;
  /** Override the description className */
  descriptionClassName?: string;
  /** Override the footer className */
  footerClassName?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  panelClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn("fixed inset-0 z-50 flex items-center justify-center", className)}
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg",
          panelClassName,
        )}
      >
        {title && (
          <h2 className={cn("text-lg font-semibold mb-1", titleClassName)}>
            {title}
          </h2>
        )}
        {description && (
          <p className={cn("text-sm text-muted-foreground mb-4", descriptionClassName)}>
            {description}
          </p>
        )}
        {children}
        {footer && (
          <div className={cn("mt-6 flex justify-end gap-2", footerClassName)}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
