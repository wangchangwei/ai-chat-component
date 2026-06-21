import type { UIAction } from "../../packages/core/schema/base.js";

export const defaultSchema: UIAction = {
  component: "radio",
  props: {
    title: "Pick your favorite database",
    description: "Used by the rest of the agent flow to scaffold your project.",
    options: [
      { label: "PostgreSQL", value: "postgres", description: "Relational + JSON" },
      { label: "MySQL", value: "mysql", description: "Mature, ubiquitous" },
      { label: "SQLite", value: "sqlite", description: "Embedded, zero-config" },
      { label: "MongoDB", value: "mongodb", description: "Document store" },
    ],
    submitLabel: "Confirm",
  },
};
