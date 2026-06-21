/**
 * Register all built-in components.
 *
 * Safe to call multiple times — `registerComponent` overwrites previous
 * entries, so this also works after `clearRegistry()` in tests.
 *
 * In production apps, call this once at app boot (the demo app does it
 * in `main.tsx`).
 */
export declare function registerDefaultComponents(): void;
