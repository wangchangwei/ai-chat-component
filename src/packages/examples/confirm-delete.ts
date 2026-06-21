import type { ExampleFlow } from "./types.js";

export const confirmDelete: ExampleFlow = {
  id: "confirm-delete",
  title: "Confirm delete",
  description:
    "Destructive action confirmation. Returns `true` if confirmed, `false` if cancelled.",
  longDescription:
    "When the agent is about to mutate user state — delete a file, drop a project, cancel a subscription — it asks first via a modal dialog.",
  userSays: "Delete the project.",
  schema: {
    component: "confirm",
    id: "confirm-delete",
    props: {
      title: "Delete this project?",
      description:
        "This will permanently remove the project and all of its files. This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Keep it",
      variant: "destructive",
    },
  },
};
