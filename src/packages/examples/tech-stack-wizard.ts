import type { ExampleFlow } from "./types.js";

export const techStackWizard: ExampleFlow = {
  id: "tech-stack-wizard",
  title: "Tech-stack wizard",
  description:
    "Multi-step wizard that gathers framework, deployment target, and team size.",
  longDescription:
    "The agent collects 3 inputs across 3 steps before it can recommend a tech stack. The wizard returns all values plus the final step index, so the agent knows the user got to the end.",
  userSays: "Recommend a tech stack for my new SaaS.",
  schema: {
    component: "wizard",
    id: "wiz-1",
    props: {
      title: "Tech-stack intake",
      description: "A few quick questions and I'll suggest a stack.",
      steps: [
        {
          id: "framework",
          title: "Framework",
          fields: [
            {
              type: "radio",
              name: "framework",
              label: "Which framework do you prefer?",
              options: [
                { label: "Next.js (React)", value: "next" },
                { label: "Remix", value: "remix" },
                { label: "SvelteKit", value: "sveltekit" },
                { label: "Nuxt (Vue)", value: "nuxt" },
              ],
              required: true,
            },
          ],
        },
        {
          id: "deploy",
          title: "Deployment",
          fields: [
            {
              type: "select",
              name: "deploy",
              label: "Where will you deploy?",
              options: [
                { label: "Vercel", value: "vercel" },
                { label: "AWS", value: "aws" },
                { label: "Self-hosted", value: "self" },
                { label: "Cloudflare", value: "cloudflare" },
              ],
              required: true,
            },
          ],
        },
        {
          id: "team",
          title: "Team size",
          fields: [
            {
              type: "number",
              name: "teamSize",
              label: "Approximate team size",
              min: 1,
              max: 1000,
              defaultValue: 3,
              required: true,
            },
            {
              type: "switch",
              name: "ssr",
              label: "Needs SSR?",
              description: "Server-rendered HTML on first load",
              defaultValue: true,
            },
          ],
        },
      ],
      submitLabel: "Recommend stack",
    },
  },
};
