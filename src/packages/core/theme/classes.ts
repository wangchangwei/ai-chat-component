/**
 * Theme — a flat map of className strings used by every ai-business-ui
 * component. Pass a partial override to any component or the `UIRenderer`
 * to recolor/reshape the entire UI without forking source.
 *
 * Naming convention: `<role>` or `<role>--<state>`. Keep keys semantic,
 * not visual — `card` not `shadowCard`, so themes can choose shadow /
 * border / outline as they prefer.
 */
export interface Theme {
  /** Outer card/panel wrapping every interactive component */
  card: string;
  /** Section header (title + description) */
  header: string;
  /** Title text */
  title: string;
  /** Description / helper text under the title */
  description: string;
  /** Form field label */
  label: string;
  /** Footer (action button row) */
  footer: string;
  /** Required-field marker (`*`) */
  requiredMark: string;
  /** Vertical spacing between fields in a form */
  fieldsGap: string;
  /** Vertical spacing inside a single field (label + control) */
  fieldGap: string;

  /** Text input */
  input: string;
  /** Multi-line input */
  textarea: string;
  /** Trigger for the select dropdown */
  selectTrigger: string;

  /** Choice row container (radio item / checkbox item) */
  choiceRow: string;
  /** Choice row when selected */
  choiceRowSelected: string;
  /** Choice label text */
  choiceLabel: string;
  /** Choice description text */
  choiceDescription: string;
  /** Small inline help text next to a switch */
  choiceHelp: string;

  /** Switch row (switch + inline description) */
  switchRow: string;
  /** Checkbox column container */
  checkboxColumn: string;
  /** Single checkbox row */
  checkboxItem: string;

  /** Card item (CardView's selectable item) */
  cardItem: string;
  /** Card item when selected */
  cardItemSelected: string;
  /** Wrapper button around a card item */
  cardItemButton: string;
  /** Card item button — selectable state */
  cardItemButtonSelectable: string;
  /** Card item button — disabled state */
  cardItemButtonDisabled: string;
  /** Card image */
  cardImage: string;
  /** Card meta dl */
  cardMetaGrid: string;
  /** Card meta dt */
  cardMetaKey: string;
  /** Card meta dd */
  cardMetaValue: string;
  /** Card header */
  cardHeader: string;
  /** Card title */
  cardTitle: string;
  /** Card description */
  cardDescription: string;

  /** Table wrapper (overflow) */
  tableWrapper: string;
  /** Table base */
  tableBase: string;
  /** Table row */
  tableRow: string;
  /** Table row interactive (hoverable) */
  tableRowInteractive: string;
  /** Table row when selected */
  tableRowSelected: string;
  /** Table head cell */
  tableHead: string;
  /** Table body cell */
  tableCell: string;
  /** Empty state cell */
  tableEmpty: string;

  /** Drop zone for Upload */
  dropZone: string;
  /** Drop zone when a file is being dragged over */
  dropZoneActive: string;
  /** Drop zone when idle */
  dropZoneIdle: string;
  /** Drop zone prompt text */
  dropPrompt: string;
  /** Drop zone "Choose file" button */
  dropButton: string;
  /** Single uploaded file row */
  fileRow: string;
  /** File metadata (size) */
  fileMeta: string;
  /** File list */
  fileList: string;
  /** Upload error banner */
  errorBanner: string;
  /** Helper text under the drop zone */
  helperText: string;

  /** Wizard step pill — default */
  stepPill: string;
  /** Wizard step pill — done */
  stepPillDone: string;
  /** Wizard step pill — active */
  stepPillActive: string;
  /** Wizard step row */
  stepRow: string;
  /** Wizard step row when active */
  stepRowActive: string;
  /** Wizard step arrow separator */
  stepArrow: string;
  /** Wizard step list (container) */
  stepList: string;
  /** Wizard step heading */
  stepHeading: string;
  /** Wizard step subheading */
  stepSubheading: string;
  /** Wizard body container */
  stepBody: string;
  /** Wizard step fields vertical gap */
  stepFieldsGap: string;
  /** Wizard footer */
  wizardFooter: string;
  /** Wizard footer left cluster */
  wizardFooterLeft: string;
  /** Wizard step title (alias) */
  stepTitle: string;

  /** Modal panel */
  modalPanel: string;
  /** Modal title */
  modalTitle: string;
  /** Modal description */
  modalDescription: string;
  /** Modal footer */
  modalFooter: string;

  /** Primary / default button */
  buttonPrimary: string;
  /** Secondary / ghost button */
  buttonGhost: string;
  /** Outline button */
  buttonOutline: string;
  /** Destructive button */
  buttonDestructive: string;
}

/**
 * Default theme — preserves the look of every component in v0.1.x. Any
 * override is shallow-merged on top of this, so a theme that only changes
 * one slot (e.g. `input`) is enough to recolor inputs everywhere.
 */
export const defaultTheme: Theme = {
  card: "aui-card rounded-lg border bg-card p-4 shadow-sm",
  header: "mb-3",
  title: "text-base font-semibold leading-none",
  description: "mt-1 text-sm text-muted-foreground",
  label: "text-sm font-medium leading-none",
  footer: "mt-4 flex justify-end gap-2",
  requiredMark: "text-destructive ml-1",
  fieldsGap: "space-y-4",
  fieldGap: "space-y-2",

  input: "",
  textarea: "",
  selectTrigger: "",

  choiceRow:
    "flex items-start gap-3 rounded-md border border-input p-3 cursor-pointer transition-colors hover:bg-accent/50",
  choiceRowSelected: "border-primary bg-primary/5",
  choiceLabel: "text-sm font-medium leading-none cursor-pointer",
  choiceDescription: "text-xs text-muted-foreground mt-1",
  choiceHelp: "text-xs text-muted-foreground",

  switchRow: "flex items-center gap-3 pt-1",
  checkboxColumn: "flex flex-col gap-2",
  checkboxItem: "flex items-center gap-2 text-sm",

  cardItem: "h-full",
  cardItemSelected: "ring-2 ring-primary border-primary",
  cardItemButton: "text-left transition-all",
  cardItemButtonSelectable: "cursor-pointer hover:shadow-md",
  cardItemButtonDisabled: "cursor-default",
  cardImage: "aspect-video w-full rounded-t-lg object-cover bg-muted",
  cardMetaGrid: "grid grid-cols-2 gap-x-3 gap-y-1 text-xs",
  cardMetaKey: "text-muted-foreground",
  cardMetaValue: "font-medium",
  cardHeader: "",
  cardTitle: "",
  cardDescription: "",

  tableWrapper: "overflow-x-auto",
  tableBase: "w-full text-sm",
  tableRow: "border-b last:border-0",
  tableRowInteractive: "cursor-pointer hover:bg-accent/40",
  tableRowSelected: "bg-primary/5",
  tableHead: "py-2 pr-4 font-medium text-muted-foreground",
  tableCell: "py-2 pr-4 align-top",
  tableEmpty: "py-6 text-center text-sm text-muted-foreground",

  dropZone:
    "rounded-md border border-dashed p-6 text-center text-sm transition-colors",
  dropZoneActive: "border-primary bg-primary/5",
  dropZoneIdle: "border-input",
  dropPrompt: "text-muted-foreground",
  dropButton: "mt-3",
  fileRow:
    "flex items-center justify-between rounded-md border bg-background px-3 py-2",
  fileMeta: "ml-3 shrink-0 text-xs text-muted-foreground",
  fileList: "mt-3 space-y-1 text-sm",
  errorBanner: "mt-3 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive",
  helperText: "mt-2 text-xs text-muted-foreground",

  stepPill:
    "flex h-6 w-6 items-center justify-center rounded-full border border-input text-muted-foreground",
  stepPillDone: "bg-primary text-primary-foreground border-primary",
  stepPillActive: "border-primary",
  stepRow: "flex items-center gap-2 text-xs whitespace-nowrap",
  stepRowActive: "font-semibold",
  stepArrow: "text-muted-foreground",
  stepList: "mt-3 flex items-center gap-2 overflow-x-auto pb-1",
  stepHeading: "text-sm font-semibold",
  stepSubheading: "mt-1 text-xs text-muted-foreground",
  stepBody: "mt-4",
  stepFieldsGap: "mt-3 space-y-4",
  wizardFooter: "mt-6 flex justify-between gap-2",
  wizardFooterLeft: "flex gap-2",
  stepTitle: "",

  modalPanel: "",
  modalTitle: "",
  modalDescription: "",
  modalFooter: "",

  buttonPrimary: "",
  buttonGhost: "",
  buttonOutline: "",
  buttonDestructive: "",
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};

/**
 * Build a theme by shallow-merging the user override on top of the default
 * theme. The merge is *one level deep* — `card` is replaced as a whole, not
 * deep-merged, so a theme that only wants a new `card` does not have to
 * repeat the rest.
 */
export function createTheme(override: DeepPartial<Theme> = {}): Theme {
  const out: Theme = { ...defaultTheme };
  for (const key of Object.keys(override) as Array<keyof Theme>) {
    const value = override[key];
    if (typeof value === "string") {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Resolve a user-supplied theme to a concrete Theme. Accepts:
 *   - `undefined` / `null` → defaultTheme
 *   - a Theme object → returned as-is
 *   - a `createTheme()`-shaped object → merged
 */
export function resolveTheme(theme?: DeepPartial<Theme> | Theme | null): Theme {
  if (!theme) return defaultTheme;
  if (typeof theme === "object") {
    if ("card" in theme && Object.keys(theme).length > 5) {
      return theme as Theme;
    }
  }
  return createTheme(theme as DeepPartial<Theme>);
}
