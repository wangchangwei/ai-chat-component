export * from "./schema/index.js";
export * from "./registry/index.js";
export { UIRenderer, type UIRendererProps } from "./renderer/UIRenderer.js";
export { useUIResult } from "./hooks/useUIResult.tsx";
export {
  defaultTheme,
  createTheme,
  resolveTheme,
  type Theme,
  type DeepPartial,
} from "./theme/index.js";
