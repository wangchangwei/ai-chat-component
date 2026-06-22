import * as React from "react";
import { Modal } from "../ui/Modal.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { ConfirmProps, ConfirmValue } from "../../core/schema/confirm.js";
import { defaultTheme } from "../../core/theme/classes.js";

/**
 * Confirm — yes/no modal dialog. Submits `true`/`false`.
 */
export function ConfirmView({
  props,
  onSubmit,
  onCancel,
  theme = defaultTheme,
}: UIRenderProps<ConfirmProps, ConfirmValue>) {
  const t = theme;
  const destructive = props.variant === "destructive";
  const confirmLabel = props.confirmLabel ?? (destructive ? "Delete" : "Confirm");
  const cancelLabel = props.cancelLabel ?? "Cancel";

  return (
    <div className="aui-confirm">
      <Modal
        open
        onClose={onCancel}
        title={props.title}
        description={props.description}
        panelClassName={t.modalPanel}
        titleClassName={t.modalTitle}
        descriptionClassName={t.modalDescription}
        footerClassName={t.modalFooter}
        footer={
          <>
            <Button variant="ghost" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button
              variant={destructive ? "destructive" : "default"}
              onClick={() => onSubmit(true)}
            >
              {confirmLabel}
            </Button>
          </>
        }
      />
    </div>
  );
}
