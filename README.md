# AI Business UI

> A reusable **Human-in-the-Loop** component library for AI Agents.
> Schema-driven · Headless · Framework-agnostic

> 可复用的 **人机交互（HITL）** 组件库，专为 AI Agent 设计。
> Schema 驱动 · 无头化 · 框架无关

[![React 19](https://img.shields.io/badge/React-19-149eca)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org)
[![Zod 4](https://img.shields.io/badge/Zod-4-3068b7)](https://zod.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## The Gap · 痛点

Today's chat frameworks stop at Markdown. When an agent needs the user to
pick a database, fill a form, confirm a deletion, or step through a wizard,
the conversation stalls. **AI Business UI** gives the agent a way to
*render* structured input — using nothing more than JSON.

当前的聊天框架只能返回 Markdown。当 Agent 需要用户选择数据库、填写表单、
确认删除或逐步操作时，对话就会卡住。**AI Business UI** 让 Agent 只需返回
一段 JSON，就能渲染出结构化的交互界面。

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────┐
│   AI Agent       │  ──→   │  UIAction JSON   │  ──→   │ React UI     │
│  (any runtime)   │  ←──   │  {comp, props}   │  ←──   │  (the user)  │
└──────────────────┘         └──────────────────┘         └──────────────┘
```

The agent never imports React, hooks, or this library. It only emits a
`{ component, props }` JSON. The renderer does the rest.

Agent 无需导入任何 React、hooks 或本库，只须发出一段 `{ component, props }`
JSON。渲染器完成剩余工作。

---

## Quick Start · 快速上手

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

The renderer:
1. Looks up the component by name.
2. Validates `props` against the registered Zod schema.
3. Renders the matching React component.
4. Calls `onSubmit(value)` when the user finishes.

渲染器的工作流程：
1. 按名称查找组件
2. 用 Zod schema 校验 `props`
3. 渲染对应的 React 组件
4. 用户完成操作后调用 `onSubmit(value)`

---

## Table of Contents · 目录

- [Components](#components--组件) — 组件列表
- [Architecture](#architecture--架构) — 系统架构
- [Installation](#installation--安装) — 安装说明
- [Schema Reference](#schema-reference--schema-参考) — Schema 参考
- [Framework Adapters](#framework-adapters--框架适配器) — 框架适配器
- [Adding a New Component](#adding-a-new-component--添加新组件) — 添加新组件
- [Headless Usage](#headless-usage--无头模式) — 无头化使用
- [Examples](#examples--示例) — 示例
- [Development](#development--开发) — 开发指南
- [Roadmap](#roadmap--路线图) — 未来规划
- [License](#license) — 开源协议

---

## Components · 组件

| Name · 名称   | Returns · 返回值           | Use for · 用途                                   |
|---------------|---------------------------|-------------------------------------------------|
| `radio`       | `string`                  | Single-choice pickers · 单选                    |
| `checkbox`    | `string[]`                | Multi-choice with min/max · 多选                 |
| `select`      | `string`                  | Dropdown / searchable select · 下拉选择          |
| `form`        | `Record<string, unknown>` | Composed forms · 组合表单                        |
| `confirm`     | `boolean`                 | Yes/no modal · 确认对话框                        |
| `wizard`      | `{ currentStep, values }` | Multi-step intake · 分步表单                    |
| `card`        | `string \| string[]`      | Selectable item list · 可选卡片列表              |
| `table`       | `string \| string[]`      | Tabular row selection · 表格选择行              |
| `upload`      | `UploadFile[]`            | File/image picker · 文件/图片上传                |

Every component follows the same contract:
每个组件遵循相同契约：

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

## Architecture · 架构

```
src/
├── packages/
│   ├── core/                # Schema, registry, renderer
│   ├── components/          # Defaults + UI primitives
│   ├── adapter-assistant-ui/ # Assistant UI adapter
│   ├── adapter-ai-sdk/      # Vercel AI SDK adapter
│   └── examples/            # 5 worked agent flows
├── demo/                    # Vite demo app
├── lib/                     # cn(), shadcn helpers
└── main.tsx                 # demo entry
```

---

## Installation · 安装

```bash
npm install
npm run dev      # demo at http://localhost:5173
npm test         # run vitest
npm run build    # type-check + production build
```

---

## Schema Reference · Schema 参考

Every schema is exported from `@ai-business-ui/core/schema`.
每个 schema 都从 `@ai-business-ui/core/schema` 导出。

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

---

## Framework Adapters · 框架适配器

### Assistant UI

```tsx
import { AssistantUIToolRenderer } from "@ai-business-ui/adapter-assistant-ui";
import { makeAssistantToolUI } from "@assistant-ui/react";

export const showUITool = makeAssistantToolUI({
  toolName: "show_ui",
  render: AssistantUIToolRenderer,
});
```

### Vercel AI SDK

```tsx
import { AIMessageUI } from "@ai-business-ui/adapter-ai-sdk";

{messages.map(m => (
  <div key={m.id}>
    <AIMessageUI parts={m.parts} />
  </div>
))}
```

---

## Adding a New Component · 添加新组件

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

---

## Headless Usage · 无头模式

```tsx
import { registerComponent } from "@ai-business-ui/core";
import { radioPropsSchema } from "@ai-business-ui/core/schema";

registerComponent("radio", {
  schema: radioPropsSchema,
  component: MyCustomRadioView,
});
```

Or compose with your design system:
或使用独立组件构建你的设计系统：

```tsx
import { RadioView, CheckboxView } from "@ai-business-ui/components";
```

---

## Examples · 示例

Five worked agent flows are in [`src/packages/examples/`](./src/packages/examples)
and also reachable from the demo at `#/examples`:

1. **Database picker** — radio
2. **Tech-stack wizard** — wizard
3. **User profile form** — form
4. **Confirm delete** — confirm
5. **Product search** — card (multi-select)

---

## Development · 开发

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

## Roadmap · 路线图

These are intentionally out of scope for MVP:

- Tree, Cascader, JSON Editor, Diff Viewer
- Workflow Builder, Approval, Timeline
- Chat Card, Progress, SQL Viewer
- Markdown Card, Mermaid, ECharts, Monaco Editor

Each new component only requires a new `registerComponent()` call.

---

## Why a Separate Library? · 为什么需要这个库？

Assistant UI, Vercel AI SDK, CopilotKit, and OpenAI Agents SDK already cover
Chat UI, Streaming, Tool Calling, and Agent Runtime. None of them provide a
*Business Interaction UI* layer between tool call and human action.
**AI Business UI** fills that gap and integrates with all of them.

Assistant UI、Vercel AI SDK、CopilotKit 和 OpenAI Agents SDK 已经覆盖了
聊天 UI、流式输出、工具调用和 Agent 运行时。但它们都没有在工具调用
和人工操作之间提供**业务交互 UI 层**。**AI Business UI** 填补了这一空白，
并与上述所有框架集成。

---

## License · 开源协议

MIT
