# AI Business UI

> A reusable **Human-in-the-Loop** component library for AI Agents.
> Schema-driven · Headless · Framework-agnostic

[![React 19](https://img.shields.io/badge/React-19-149eca)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org)
[![Zod 4](https://img.shields.io/badge/Zod-4-3068b7)](https://zod.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## The gap

Today's chat frameworks stop at Markdown. When an agent needs the user to
pick a database, fill a form, confirm a deletion, or step through a wizard,
the conversation stalls. **AI Business UI** gives the agent a way to
*render* structured input — using nothing more than JSON.

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────┐
│   AI Agent       │  ──→   │  UIAction JSON   │  ──→   │ React UI     │
│  (any runtime)   │  ←──   │  {comp, props}   │  ←──   │  (the user)  │
└──────────────────┘         └──────────────────┘         └──────────────┘
```

The agent never imports React, hooks, or this library. It only emits a
`{ component, props }` JSON. The renderer does the rest.

---

## Quick start

```tsx
import {
  UIRenderer,
  registerDefaultComponents,
} from "@ai-business-ui/core";

registerDefaultComponents();

const schema = {
  component: "radio",
  props: {
    title: "Pick a database",
    options: [
      { label: "PostgreSQL", value: "postgres" },
      { label: "MySQL",      value: "mysql" },
    ],
  },
};

export function App() {
  return (
    <UIRenderer
      schema={schema}
      onSubmit={(value) => sendToAgent(value)}
      onCancel={() => sendToAgent({ cancelled: true })}
    />
  );
}
```

That's it. The renderer:
1. Looks up the component by name.
2. Validates `props` against the registered Zod schema.
3. Renders the matching React component.
4. Calls `onSubmit(value)` when the user finishes.

---

## Table of contents

- [Components](#components)
- [Architecture](#architecture)
- [Installation](#installation)
- [Schema reference](#schema-reference)
- [Framework adapters](#framework-adapters)
- [Adding a new component](#adding-a-new-component)
- [Headless usage](#headless-usage)
- [Examples](#examples)
- [Development](#development)
- [Roadmap](#roadmap)
- [License](#license)

---

## Components

| Name      | Returns            | Use for                                           |
|-----------|--------------------|---------------------------------------------------|
| `radio`   | `string`           | Single-choice pickers                             |
| `checkbox`| `string[]`         | Multi-choice with optional min/max                |
| `select`  | `string`           | Dropdown / searchable select                      |
| `form`    | `Record<string, unknown>` | Composed forms (input, textarea, number, switch, radio, checkbox, select) |
| `confirm` | `boolean`          | Yes/no modal                                      |
| `wizard`  | `{ currentStep, values }` | Multi-step intake                          |
| `card`    | `string \| string[]`     | List of items; selectable + multi              |
| `table`   | `string \| string[]`     | Tabular data with row selection                 |
| `upload`  | `UploadFile[]`     | File/image picker                                 |

Every component follows the same contract:

```tsx
<UIRenderProps<TProps, TValue>> {
  props: TProps;          // Zod-validated
  value: TValue | undefined;
  onChange(v: TValue): void;
  onSubmit(v: TValue): void;
  onCancel(): void;
}
```

---

## Architecture

```
src/
├── packages/
│   ├── core/                # @ai-business-ui/core — schema, registry, renderer
│   ├── components/          # @ai-business-ui/components — defaults + UI primitives
│   ├── adapter-assistant-ui/
│   ├── adapter-ai-sdk/
│   └── examples/            # 5 worked agent flows
├── demo/                    # Vite demo app
├── lib/                     # cn(), shadcn helpers
└── main.tsx                 # demo entry
```

The internal boundaries mirror a future monorepo split; today they live in
one package for ergonomics. Promoting them to separate npm packages is a
mechanical refactor (each folder already has clean public surfaces via its
`index.ts`).

---

## Installation

```bash
# clone, then
npm install
npm run dev      # demo at http://localhost:5173
npm test         # run vitest
npm run build    # type-check + production build
```

For consumers (this MVP is a single-package project; consumers can `git clone`
and import from `src/`):

```bash
npm install react@^19 zod@^4
# then add this package as a workspace / git dep:
#   "ai-business-ui": "github:you/ai-business-ui"
```

---

## Schema reference

Every schema is exported from `@ai-business-ui/core/schema`. Types are inferred.

```ts
import type { UIAction } from "@ai-business-ui/core";
import {
  radioPropsSchema,
  type RadioProps,
} from "@ai-business-ui/core/schema";

const action: UIAction<RadioProps> = radioPropsSchema.parse({
  component: "radio",
  props: { title: "x", options: [{label:"A",value:"a"},{label:"B",value:"b"}] },
});
```

Full reference for each component is in
[`src/packages/core/schema/`](./src/packages/core/schema).

---

## Framework adapters

### Assistant UI

```tsx
import { AssistantUIToolRenderer } from "@ai-business-ui/adapter-assistant-ui";
import { makeAssistantToolUI } from "@assistant-ui/react";

export const showUITool = makeAssistantToolUI({
  toolName: "show_ui",
  render: AssistantUIToolRenderer,
});
```

The adapter also dispatches `ai-business-ui:submit` and `ai-business-ui:cancel`
window events so you can route results back into your agent without coupling
the renderer to assistant-ui internals.

### Vercel AI SDK

```tsx
import { AIMessageUI } from "@ai-business-ui/adapter-ai-sdk";

// inside your chat thread:
{messages.map(m => (
  <div key={m.id}>
    <AIMessageUI parts={m.parts} />
  </div>
))}
```

Recognized message-part types:
- `data-ui` — direct UIAction in `data`
- `tool-show_ui` — `toolInvocation.result` is the UIAction
- `tool-invocation` — same as above (compatibility)

---

## Adding a new component

```tsx
import { z } from "zod";
import { registerComponent } from "@ai-business-ui/core";

const myProps = z.object({
  title: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
});

function MyView({ props, onSubmit }: any) {
  return (
    <ul>
      {props.options.map(o => (
        <li key={o.value}>
          <button onClick={() => onSubmit(o.value)}>{o.label}</button>
        </li>
      ))}
    </ul>
  );
}

registerComponent("my", { schema: myProps, component: MyView });
```

That's the entire extension API — no edits to the renderer required.

---

## Headless usage

Every component view is a plain React component. To restyle or replace the
default rendering, register your own implementation:

```tsx
import { registerComponent } from "@ai-business-ui/core";
import { radioPropsSchema } from "@ai-business-ui/core/schema";

registerComponent("radio", {
  schema: radioPropsSchema,
  component: MyCustomRadioView,
});
```

Or compose with your design system by importing individual components:

```tsx
import { RadioView, CheckboxView } from "@ai-business-ui/components";
```

---

## Examples

Five worked agent flows live in [`src/packages/examples/`](./src/packages/examples)
and are also reachable from the demo at `#/examples`:

1. **Database picker** — radio
2. **Tech-stack wizard** — wizard
3. **User profile form** — form
4. **Confirm delete** — confirm
5. **Product search** — card (multi-select)

Each example is a complete `{ user prompt → emitted schema → rendered UI →
submitted value }` loop. See [`examples/README.md`](./src/packages/examples/README.md).

---

## Development

```bash
npm run dev         # start the demo
npm test            # run all tests
npm run test:watch  # watch mode
npm run lint        # eslint
npm run build       # tsc --noEmit + vite build
```

Test layout:
- `tests/schema.test.ts` — Zod validation
- `tests/registry.test.ts` — registry CRUD
- `tests/renderer.test.tsx` — renderer lookup + error states
- `tests/components.test.tsx` — one render test per component
- `tests/adapters.test.tsx` — adapter message parsing
- `tests/useUIResult.test.tsx` — hook lifecycle

---

## Roadmap

These are intentionally out of scope for MVP:

- Tree, Cascader, JSON Editor, Diff Viewer
- Workflow Builder, Approval, Timeline
- Chat Card, Progress, SQL Viewer
- Markdown Card, Mermaid, ECharts, Monaco Editor

When added, each becomes a new `registerComponent()` call — no architectural
change required.

---

## Why a separate library?

Assistant UI, Vercel AI SDK, CopilotKit, and OpenAI Agents SDK already cover
Chat UI, Streaming, Tool Calling, and Agent Runtime. None of them provide a
*Business Interaction UI* layer between tool call and human action.
**AI Business UI** fills that gap and integrates with all of them.

---

## License

MIT
