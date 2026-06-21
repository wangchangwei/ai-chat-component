import type { ExampleFlow } from "./types.js";

export const databasePicker: ExampleFlow = {
  id: "database-picker",
  title: "Database picker",
  description:
    "Agent asks which database to provision before scaffolding a project.",
  longDescription:
    "When the user asks the agent to scaffold a project, the agent emits a radio schema. The user picks once; the agent receives the value and continues.",
  userSays: "I want to create a website.",
  schema: {
    component: "radio",
    id: "db-pick",
    props: {
      title: "Pick a database",
      description: "Used to scaffold your backend and migrations.",
      submitLabel: "Confirm",
      options: [
        {
          label: "PostgreSQL",
          value: "postgres",
          description: "Relational + JSON, mature ecosystem",
        },
        {
          label: "MySQL",
          value: "mysql",
          description: "Ubiquitous, well-known operational profile",
        },
        {
          label: "SQLite",
          value: "sqlite",
          description: "Embedded, zero-config",
        },
        {
          label: "MongoDB",
          value: "mongodb",
          description: "Document store, flexible schemas",
        },
      ],
    },
  },
};
