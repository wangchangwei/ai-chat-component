// Main package entry — re-exports all sub-packages
export * from "./packages/core/index.js";
export * from "./packages/components/index.js";
export { AIMessageUI } from "./packages/adapter-ai-sdk/index.js";
export { AssistantUIToolRenderer } from "./packages/adapter-assistant-ui/index.js";
export { cn } from "./lib/utils.js";
