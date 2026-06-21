import { describe, it, expect, beforeEach } from "vitest";
import { z } from "zod";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  UIRenderer,
  registerComponent,
  clearRegistry,
} from "../src/packages/core/index.js";

beforeEach(() => {
  clearRegistry();
});

describe("UIRenderer", () => {
  it("renders the registered component and threads onSubmit", () => {
    const Stub = ({
      props,
      onSubmit,
    }: {
      props: { name: string };
      onSubmit: (v: string) => void;
    }) => (
      <button data-testid="stub-btn" onClick={() => onSubmit(props.name)}>
        stub
      </button>
    );
    registerComponent("stub", {
      schema: z.object({ name: z.string() }),
      component: Stub as any,
    });

    let captured: unknown = undefined;
    render(
      <UIRenderer
        schema={{ component: "stub", props: { name: "world" } }}
        onSubmit={(v) => (captured = v)}
      />,
    );

    screen.getByTestId("stub-btn").click();
    expect(captured).toBe("world");
  });

  it("renders an error block when the component is unknown", () => {
    render(<UIRenderer schema={{ component: "missing", props: {} }} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/Unknown component/i)).toBeInTheDocument();
  });

  it("renders an error block when props are invalid", () => {
    const Stub = () => <div />;
    registerComponent("stub", {
      schema: z.object({ name: z.string() }),
      component: Stub as any,
    });
    render(<UIRenderer schema={{ component: "stub", props: { name: 1 } }} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/Invalid props/i)).toBeInTheDocument();
  });

  it("passes through schema.id and component name as data attributes", () => {
    const Stub = (_: any) => <div data-testid="stub" />;
    registerComponent("stub", {
      schema: z.object({}),
      component: Stub as any,
    });
    const { container } = render(
      <UIRenderer
        schema={{ component: "stub", props: {}, id: "abc" }}
      />,
    );
    const el = container.querySelector("[data-aui-component]");
    expect(el).not.toBeNull();
    expect(el?.getAttribute("data-aui-component")).toBe("stub");
    expect(el?.getAttribute("data-aui-id")).toBe("abc");
  });
});
