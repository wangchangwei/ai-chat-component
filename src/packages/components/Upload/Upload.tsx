import * as React from "react";
import { Button } from "../ui/Button.js";
import { cn } from "../../../lib/utils.js";
import type { UIRenderProps } from "../../core/registry/index.js";
import type {
  UploadProps,
  UploadValue,
  UploadFile,
} from "../../core/schema/upload.js";

/**
 * Upload — file/image picker. Reads small files into a dataUri for inline
 * transport (large files should be uploaded by the host first; the Upload
 * component then receives the metadata-only payload from the agent).
 */
export function UploadView({
  props,
  value,
  onChange,
  onSubmit,
  onCancel,
}: UIRenderProps<UploadProps, UploadValue>) {
  const [internal, setInternal] = React.useState<UploadFile[]>(value ?? []);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function readFile(file: File): Promise<UploadFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUri: typeof reader.result === "string" ? reader.result : undefined,
        });
      };
      // Inline as data URI; fine for the demo. Real apps swap this for a signed-URL upload.
      reader.readAsDataURL(file);
    });
  }

  async function ingestFiles(list: FileList | File[]) {
    setError(null);
    const files = Array.from(list);
    const accepted: UploadFile[] = [];
    for (const f of files) {
      if (props.maxSize && f.size > props.maxSize) {
        setError(`${f.name} exceeds maxSize of ${props.maxSize} bytes`);
        continue;
      }
      if (props.accept) {
        const acceptedTypes = props.accept
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const ok = acceptedTypes.some((t) => {
          if (t.endsWith("/*")) return f.type.startsWith(t.slice(0, -1));
          return f.type === t;
        });
        if (!ok) {
          setError(`${f.name} does not match accept "${props.accept}"`);
          continue;
        }
      }
      try {
        accepted.push(await readFile(f));
      } catch (e) {
        setError(`Failed to read ${f.name}`);
      }
    }
    const next = props.multiple ? [...internal, ...accepted] : accepted.slice(0, 1);
    setInternal(next);
    onChange(next);
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      void ingestFiles(e.target.files);
      e.target.value = "";
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void ingestFiles(e.dataTransfer.files);
    }
  }

  const canSubmit = !props.required || internal.length > 0;

  return (
    <section className="aui-upload rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3">
        <h3 className="text-base font-semibold leading-none">{props.title}</h3>
        {props.description && (
          <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
        )}
      </header>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "rounded-md border border-dashed p-6 text-center text-sm transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-input",
        )}
      >
        <div className="text-muted-foreground">
          Drop {props.multiple ? "files" : "a file"} here, or
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => inputRef.current?.click()}
        >
          Choose file{props.multiple ? "s" : ""}
        </Button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={props.accept}
          multiple={props.multiple}
          onChange={onPick}
        />
        {props.maxSize && (
          <div className="mt-2 text-xs text-muted-foreground">
            Max size: {Math.round(props.maxSize / 1024)} KB
          </div>
        )}
      </div>
      {error && (
        <div className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}
      {internal.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm">
          {internal.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between rounded-md border bg-background px-3 py-2"
            >
              <span className="truncate">{f.name}</span>
              <span className="ml-3 shrink-0 text-xs text-muted-foreground">
                {Math.round(f.size / 1024)} KB
              </span>
            </li>
          ))}
        </ul>
      )}
      <footer className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={() => onSubmit(internal)} disabled={!canSubmit}>
          Submit
        </Button>
      </footer>
    </section>
  );
}
