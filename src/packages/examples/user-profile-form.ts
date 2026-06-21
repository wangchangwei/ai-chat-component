import type { ExampleFlow } from "./types.js";

export const userProfileForm: ExampleFlow = {
  id: "user-profile-form",
  title: "User profile form",
  description:
    "Composed form that gathers name, role, timezone, newsletter opt-in, and interests.",
  longDescription:
    "A single form with mixed field types — input, switch, radio, checkbox — submitted as one record back to the agent.",
  userSays: "Update my profile.",
  schema: {
    component: "form",
    id: "form-profile",
    props: {
      title: "Edit profile",
      description: "Tells the assistant how to address you and what to send.",
      submitLabel: "Save",
      fields: [
        {
          type: "input",
          name: "displayName",
          label: "Display name",
          placeholder: "Ada Lovelace",
          required: true,
          defaultValue: "",
        },
        {
          type: "textarea",
          name: "bio",
          label: "Short bio",
          rows: 3,
          placeholder: "What should the agent know about you?",
        },
        {
          type: "radio",
          name: "role",
          label: "Role",
          required: true,
          options: [
            { label: "Engineer", value: "engineer" },
            { label: "Designer", value: "designer" },
            { label: "Product", value: "product" },
            { label: "Other", value: "other" },
          ],
        },
        {
          type: "switch",
          name: "newsletter",
          label: "Subscribe to newsletter",
          description: "Monthly product updates.",
          defaultValue: true,
        },
        {
          type: "checkbox",
          name: "interests",
          label: "Interests",
          options: [
            { label: "AI Agents", value: "ai" },
            { label: "Devtools", value: "devtools" },
            { label: "Design", value: "design" },
            { label: "Open source", value: "oss" },
          ],
          defaultValue: ["ai", "devtools"],
        },
      ],
    },
  },
};
