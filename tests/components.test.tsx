import { describe, it, expect, beforeEach } from "vitest";
import * as React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  UIRenderer,
  clearRegistry,
} from "../src/packages/core/index.js";
import { registerDefaultComponents } from "../src/packages/components/index.js";

beforeEach(() => {
  cleanup();
  clearRegistry();
  registerDefaultComponents();
});

describe("Radio", () => {
  it("submits the picked value", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "radio",
          props: {
            title: "Pick",
            options: [
              { label: "A", value: "a" },
              { label: "B", value: "b" },
            ],
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.click(screen.getByLabelText(/^A/));
    expect(result).toBe("a");
  });
});

describe("Checkbox", () => {
  it("submits array of selected values", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "checkbox",
          props: {
            title: "Pick many",
            options: [
              { label: "A", value: "a" },
              { label: "B", value: "b" },
              { label: "C", value: "c" },
            ],
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "A" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "C" }));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(result).toEqual(["a", "c"]);
  });
});

describe("Select", () => {
  it("submits the chosen value", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "select",
          props: {
            title: "Pick",
            options: [
              { label: "A", value: "a" },
              { label: "B", value: "b" },
            ],
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(result).toBe("b");
  });
});

describe("Confirm", () => {
  it("submits true on confirm and false on cancel", () => {
    let first: unknown = "unset";
    const { rerender } = render(
      <UIRenderer
        schema={{
          component: "confirm",
          props: { title: "Sure?" },
        }}
        onSubmit={(v) => (first = v)}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(first).toBe(true);

    let second: unknown = "unset";
    rerender(
      <UIRenderer
        schema={{
          component: "confirm",
          props: { title: "Sure?" },
        }}
        onCancel={() => (second = "cancelled")}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(second).toBe("cancelled");
  });
});

describe("Form", () => {
  it("submits a record of values", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "form",
          props: {
            title: "Form",
            fields: [
              { type: "input", name: "first", label: "First" },
              { type: "input", name: "last", label: "Last" },
              {
                type: "radio",
                name: "role",
                label: "Role",
                options: [
                  { label: "X", value: "x" },
                  { label: "Y", value: "y" },
                ],
              },
            ],
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.change(screen.getByLabelText(/First/), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/Last/), { target: { value: "L" } });
    fireEvent.click(screen.getByLabelText(/^Y/));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(result).toEqual({ first: "Ada", last: "L", role: "y" });
  });
});

describe("Wizard", () => {
  it("submits all values + currentStep", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "wizard",
          props: {
            title: "W",
            steps: [
              {
                id: "s1",
                title: "StepOne",
                fields: [{ type: "input", name: "a", label: "Field-A" }],
              },
              {
                id: "s2",
                title: "StepTwo",
                fields: [{ type: "input", name: "b", label: "Field-B" }],
              },
            ],
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.change(screen.getByLabelText("Field-A"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    fireEvent.change(screen.getByLabelText("Field-B"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /finish/i }));
    expect(result).toEqual({ currentStep: 1, values: { a: "1", b: "2" } });
  });
});

describe("Card (multi)", () => {
  it("submits array of selected ids", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "card",
          props: {
            title: "Pick",
            selectable: true,
            multi: true,
            items: [
              { id: "1", title: "One" },
              { id: "2", title: "Two" },
            ],
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.click(screen.getByText("One"));
    fireEvent.click(screen.getByText("Two"));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(result).toEqual(["1", "2"]);
  });
});

describe("Table (single)", () => {
  it("submits the selected row id", () => {
    let result: unknown = undefined;
    render(
      <UIRenderer
        schema={{
          component: "table",
          props: {
            title: "T",
            columns: [{ key: "name", label: "Name" }],
            rows: [
              { id: "1", name: "Ada" },
              { id: "2", name: "Bob" },
            ],
            rowSelection: "single",
          },
        }}
        onSubmit={(v) => (result = v)}
      />,
    );
    fireEvent.click(screen.getByText("Bob"));
    expect(result).toBe("2");
  });
});

describe("Upload", () => {
  it("rejects files larger than maxSize and surfaces the error", async () => {
    render(
      <UIRenderer
        schema={{
          component: "upload",
          props: { title: "U", maxSize: 10 },
        }}
        onSubmit={() => {}}
      />,
    );
    // The Upload component renders a hidden <input type="file">.
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement | null;
    expect(input).not.toBeNull();
    const bigFile = new File(["x".repeat(100)], "big.txt", {
      type: "text/plain",
    });
    // In jsdom, `files` is a read-only getter; override via defineProperty.
    Object.defineProperty(input!, "files", {
      configurable: true,
      value: [bigFile],
    });
    fireEvent.change(input!);
    // The component should surface an error and the file list stays empty.
    expect(await screen.findByText(/exceeds maxSize/i)).toBeInTheDocument();
    expect(screen.queryByText("big.txt")).not.toBeInTheDocument();
  });

  it("accepts files within maxSize and lists them", async () => {
    render(
      <UIRenderer
        schema={{
          component: "upload",
          props: { title: "U", maxSize: 10_000 },
        }}
        onSubmit={() => {}}
      />,
    );
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement | null;
    expect(input).not.toBeNull();
    const smallFile = new File(["hi"], "small.txt", { type: "text/plain" });
    Object.defineProperty(input!, "files", {
      configurable: true,
      value: [smallFile],
    });
    fireEvent.change(input!);
    expect(await screen.findByText("small.txt")).toBeInTheDocument();
  });
});
