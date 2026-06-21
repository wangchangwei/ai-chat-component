import { describe, it, expect, beforeEach } from "vitest";
import * as React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import {
  UIRenderer,
  clearRegistry,
} from "../src/packages/core/index.js";
import { registerDefaultComponents } from "../src/packages/components/index.js";
import { AIMessageUI } from "../src/packages/adapter-ai-sdk/index.js";
import { AssistantUIToolRenderer } from "../src/packages/adapter-assistant-ui/index.js";

beforeEach(() => {
  cleanup();
  clearRegistry();
  registerDefaultComponents();
});

describe("AIMessageUI", () => {
  it("renders data-ui parts", () => {
    render(
      <AIMessageUI
        parts={[
          {
            type: "data-ui",
            data: {
              component: "radio",
              props: {
                title: "Pick",
                options: [
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                ],
              },
            },
          },
        ]}
      />,
    );
    expect(screen.getByText("Pick")).toBeInTheDocument();
    expect(screen.getByLabelText(/^A/)).toBeInTheDocument();
  });

  it("renders tool-show_ui parts", () => {
    render(
      <AIMessageUI
        parts={[
          {
            type: "tool-show_ui",
            toolInvocation: {
              state: "result",
              toolName: "show_ui",
              result: {
                component: "confirm",
                props: { title: "Sure?" },
              },
            },
          },
        ]}
      />,
    );
    expect(screen.getByText("Sure?")).toBeInTheDocument();
  });

  it("returns null when no UIAction parts are present", () => {
    const { container } = render(
      <AIMessageUI parts={[{ type: "text", text: "hi" }]} />,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("AssistantUIToolRenderer", () => {
  it("renders a UIAction result", () => {
    render(
      <AssistantUIToolRenderer
        result={{
          component: "radio",
          props: {
            title: "Pick",
            options: [
              { label: "A", value: "a" },
              { label: "B", value: "b" },
            ],
          },
        }}
      />,
    );
    expect(screen.getByText("Pick")).toBeInTheDocument();
  });

  it("shows an error block for an invalid result", () => {
    render(<AssistantUIToolRenderer result={{}} />);
    expect(screen.getByText(/not a valid UIAction/i)).toBeInTheDocument();
  });

  it("emits an ai-business-ui:submit event on submit", () => {
    let detail: unknown = undefined;
    function listener(e: Event) {
      detail = (e as CustomEvent).detail;
    }
    window.addEventListener("ai-business-ui:submit", listener);
    render(
      <AssistantUIToolRenderer
        result={{
          component: "radio",
          props: {
            title: "Pick",
            options: [
              { label: "A", value: "a" },
              { label: "B", value: "b" },
            ],
          },
        }}
      />,
    );
    fireEvent.click(screen.getByLabelText(/^B/));
    expect(detail).toBe("b");
    window.removeEventListener("ai-business-ui:submit", listener);
  });
});
