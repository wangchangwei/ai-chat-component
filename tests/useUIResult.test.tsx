import { describe, it, expect, beforeEach } from "vitest";
import * as React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  UIRenderer,
  clearRegistry,
  useUIResult,
} from "../src/packages/core/index.js";
import { registerDefaultComponents } from "../src/packages/components/index.js";

beforeEach(() => {
  cleanup();
  clearRegistry();
  registerDefaultComponents();
});

describe("useUIResult", () => {
  it("exposes schema, setSchema, ResultView, result, cancelled, reset", () => {
    function Demo() {
      const { setSchema, ResultView, result, cancelled, reset } = useUIResult<string>();
      return (
        <>
          <button
            onClick={() =>
              setSchema({
                component: "radio",
                props: {
                  title: "Pick",
                  options: [
                    { label: "A", value: "a" },
                    { label: "B", value: "b" },
                  ],
                },
              })
            }
          >
            arm
          </button>
          <ResultView
            onSubmit={() => {}}
            onCancel={() => {}}
          />
          <div data-testid="result">{result === null ? "null" : String(result)}</div>
          <div data-testid="cancelled">{cancelled ? "yes" : "no"}</div>
          <button onClick={reset}>reset</button>
        </>
      );
    }

    render(<Demo />);
    expect(screen.getByTestId("result").textContent).toBe("null");
    fireEvent.click(screen.getByText("arm"));
    fireEvent.click(screen.getByLabelText(/^A/));
    expect(screen.getByTestId("result").textContent).toBe("a");

    // Re-arm and cancel
    fireEvent.click(screen.getByText("arm"));
    fireEvent.click(screen.getByText(/Cancel/));
    expect(screen.getByTestId("cancelled").textContent).toBe("yes");

    // Reset clears everything
    fireEvent.click(screen.getByText("reset"));
    expect(screen.getByTestId("result").textContent).toBe("null");
    expect(screen.getByTestId("cancelled").textContent).toBe("no");
  });

  it("returns null from ResultView before setSchema", () => {
    function Demo() {
      const { ResultView } = useUIResult();
      return <ResultView onSubmit={() => {}} />;
    }
    const { container } = render(<Demo />);
    expect(container.firstChild).toBeNull();
  });
});
