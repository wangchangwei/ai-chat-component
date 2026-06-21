import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";

// Silence noisy console.error from React for expected error tests
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const msg = String(args[0] ?? "");
  if (msg.includes("not wrapped in act") || msg.includes("Warning:")) return;
  originalError(...args);
};

afterEach(() => {
  vi.clearAllMocks();
});
