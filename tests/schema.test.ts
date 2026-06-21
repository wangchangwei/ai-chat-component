import { describe, it, expect } from "vitest";
import {
  radioPropsSchema,
  checkboxPropsSchema,
  selectPropsSchema,
  formPropsSchema,
  confirmPropsSchema,
  wizardPropsSchema,
  cardPropsSchema,
  tablePropsSchema,
  uploadPropsSchema,
} from "../src/packages/core/schema/index.js";

describe("radio schema", () => {
  it("accepts a minimal valid schema", () => {
    const r = radioPropsSchema.safeParse({
      title: "Pick",
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    });
    expect(r.success).toBe(true);
  });

  it("rejects fewer than 2 options", () => {
    const r = radioPropsSchema.safeParse({
      title: "Pick",
      options: [{ label: "A", value: "a" }],
    });
    expect(r.success).toBe(false);
  });
});

describe("checkbox schema", () => {
  it("accepts min/max", () => {
    const r = checkboxPropsSchema.safeParse({
      title: "Pick many",
      options: [{ label: "A", value: "a" }],
      min: 0,
      max: 3,
    });
    expect(r.success).toBe(true);
  });

  it("rejects negative min", () => {
    const r = checkboxPropsSchema.safeParse({
      title: "Pick",
      options: [{ label: "A", value: "a" }],
      min: -1,
    });
    expect(r.success).toBe(false);
  });
});

describe("select schema", () => {
  it("accepts placeholder and searchable", () => {
    const r = selectPropsSchema.safeParse({
      title: "Pick",
      options: [{ label: "A", value: "a" }],
      placeholder: "Choose",
      searchable: true,
    });
    expect(r.success).toBe(true);
  });
});

describe("form schema", () => {
  it("accepts a mixed fields list", () => {
    const r = formPropsSchema.safeParse({
      title: "Form",
      fields: [
        { type: "input", name: "a", label: "A" },
        { type: "textarea", name: "b", label: "B" },
        { type: "number", name: "c", label: "C" },
        { type: "switch", name: "d", label: "D" },
        {
          type: "radio",
          name: "e",
          label: "E",
          options: [
            { label: "x", value: "x" },
            { label: "y", value: "y" },
          ],
        },
        {
          type: "checkbox",
          name: "f",
          label: "F",
          options: [{ label: "x", value: "x" }],
        },
        {
          type: "select",
          name: "g",
          label: "G",
          options: [{ label: "x", value: "x" }],
        },
      ],
    });
    expect(r.success).toBe(true);
  });

  it("rejects an unknown field type", () => {
    const r = formPropsSchema.safeParse({
      title: "Form",
      fields: [{ type: "magic", name: "x", label: "X" }],
    });
    expect(r.success).toBe(false);
  });
});

describe("confirm schema", () => {
  it("accepts minimal props", () => {
    const r = confirmPropsSchema.safeParse({ title: "Sure?" });
    expect(r.success).toBe(true);
  });
  it("rejects an unknown variant", () => {
    const r = confirmPropsSchema.safeParse({
      title: "Sure?",
      variant: "explode",
    });
    expect(r.success).toBe(false);
  });
});

describe("wizard schema", () => {
  it("accepts multi-step", () => {
    const r = wizardPropsSchema.safeParse({
      title: "Wizard",
      steps: [
        {
          id: "a",
          title: "A",
          fields: [{ type: "input", name: "a", label: "A" }],
        },
        {
          id: "b",
          title: "B",
          fields: [{ type: "input", name: "b", label: "B" }],
        },
      ],
    });
    expect(r.success).toBe(true);
  });
});

describe("card schema", () => {
  it("accepts selectable + multi", () => {
    const r = cardPropsSchema.safeParse({
      title: "Pick",
      items: [{ id: "1", title: "One" }],
      selectable: true,
      multi: true,
    });
    expect(r.success).toBe(true);
  });
});

describe("table schema", () => {
  it("accepts columns and rows", () => {
    const r = tablePropsSchema.safeParse({
      title: "T",
      columns: [{ key: "name", label: "Name" }],
      rows: [{ id: "1", name: "Ada" }],
    });
    expect(r.success).toBe(true);
  });
});

describe("upload schema", () => {
  it("accepts minimal props", () => {
    const r = uploadPropsSchema.safeParse({ title: "Upload" });
    expect(r.success).toBe(true);
  });

  it("rejects negative maxSize", () => {
    const r = uploadPropsSchema.safeParse({ title: "Upload", maxSize: -1 });
    expect(r.success).toBe(false);
  });
});
