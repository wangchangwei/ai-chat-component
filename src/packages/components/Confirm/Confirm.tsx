import * as React from "react";
import { Modal } from "../ui/Modal.js";
import { Button } from "../ui/Button.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { ConfirmProps, ConfirmValue } from "../../core/schema/confirm.js";

/**
 * Confirm — yes/no modal dialog. Submits `true`/`false`.
 */
export function ConfirmView({
  props,
  onSubmit,
  onCancel,
}: UIRenderProps<ConfirmProps, ConfirmValue>) {
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
