import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { UploadProps, UploadValue } from "../../core/schema/upload.js";
/**
 * Upload — file/image picker. Reads small files into a dataUri for inline
 * transport (large files should be uploaded by the host first; the Upload
 * component then receives the metadata-only payload from the agent).
 */
export declare function UploadView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<UploadProps, UploadValue>): React.JSX.Element;
