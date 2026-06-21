# AI Business UI

> A reusable **Human-in-the-Loop** component library for AI Agents.
> Schema-driven · Headless · Framework-agnostic

> 可复用的 **人机交互（HITL）** 组件库，专为 AI Agent 设计。
> Schema 驱动 · 无头化 · 框架无关

[![React 19](https://img.shields.io/badge/React-19-149eca)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org)
[![Zod 4](https://img.shields.io/badge/Zod-4-3068b7)](https://zod.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![npm](https://img.shields.io/badge/npm-ai--business--ui-cb3833)](https://www.npmjs.com/package/ai-business-ui)

---

## Installation · 安装

```bash
npm install ai-business-ui
```

Requires: `react@^18` or `react@^19`, `zod@^4`

---

## Quick Start · 快速上手

```tsx
import { UIRenderer, registerDefaultComponents } from "ai-business-ui";

// Register once at app boot
registerDefaultComponents();

const schema = {
  component: "radio",
  props: {
    title: "Pick a database",
    options: [
      { label: "PostgreSQL", value: "postgres" },
      { label: "MySQL",      value: "mysql" },
    ],
    submitLabel: "Confirm",
  },
};

export function App() {
  return (
    <UIRenderer
      schema={schema}
      onSubmit={(value) => console.log("User picked:", value)}
      onCancel={() => console.log("User cancelled")}
    />
  );
}
```

**How it works · 工作原理：**

1. Agent 返回 `{ component, props }` JSON（无需导入任何库）
2. `UIRenderer` 按名称查找组件
3. Zod 校验 `props` 类型
4. 渲染 React 组件
5. 用户操作完成后调用 `onSubmit(value)` 将结果返回给 Agent

---

## Table of Contents · 目录

- [Installation](#installation--安装)
- [Core API](#core-api--核心-api)
- [Components](#components--组件列表)
- [Schema Reference](#schema-reference--schema-参考)
- [Framework Adapters](#framework-adapters--框架适配器)
- [Adding a New Component](#adding-a-new-component--添加新组件)
- [Headless Usage](#headless-usage--无头模式)
- [Examples](#examples--示例)
- [Development](#development--开发)
- [License](#license)

---

## Core API · 核心 API

### UIRenderer

```tsx
import { UIRenderer, registerDefaultComponents } from "ai-business-ui";

<UIRenderer
  schema={{ component: "radio", props: { ... } }}
  onSubmit={(value) => sendToAgent(value)}
  onCancel={() => sendToAgent(null)}
/>
```

### registerDefaultComponents

在应用启动时调用一次，注册所有内置组件（Radio, Checkbox, Select, Form, Wizard, Card, Table, Upload, Confirm）。

```tsx
import { registerDefaultComponents } from "ai-business-ui";
registerDefaultComponents();
```

### cn()

shadcn/ui 风格的 className 合并工具。

```tsx
import { cn } from "ai-business-ui";
<div className={cn("base-class", condition && "conditional-class")} />
```

---

## Components · 组件列表

| Name       | Returns                    | Description                     |
|------------|----------------------------|---------------------------------|
| `radio`    | `string`                   | 单选列表                         |
| `checkbox` | `string[]`                 | 多选列表（支持 min/max 限制）      |
| `select`   | `string`                   | 下拉选择（支持搜索）              |
| `form`     | `Record<string, unknown>`  | 组合表单（input/textarea/number/switch/radio/checkbox/select） |
| `confirm`  | `boolean`                  | 确认对话框                        |
| `wizard`   | `{ step, values }`         | 分步表单                         |
| `card`     | `string \| string[]`       | 可选卡片列表                      |
| `table`    | `string \| string[]`       | 表格行选择                       |
| `upload`   | `UploadFile[]`             | 文件/图片上传                     |

所有组件遵循统一契约：

```tsx
interface UIRenderProps<TProps, TValue> {
  props: TProps;              // Zod 校验后的 props
  value: TValue | undefined;  // 当前值
  onChange(v: TValue): void;   // 变更回调
  onSubmit(v: TValue): void;  // 提交回调
  onCancel(): void;           // 取消回调
}
```

---

## Schema Reference · Schema 参考

所有 Schema 类型都从 `ai-business-ui` 导出：

```tsx
import type { UIAction } from "ai-business-ui";
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
} from "ai-business-ui";

// 校验并使用
const action = radioPropsSchema.parse({
  component: "radio",
  props: { title: "Pick one", options: [...] },
});
```

### Radio

```tsx
{
  component: "radio",
  props: {
    title: "Pick a database",
    description?: "可选描述",
    options: [
      { label: "PostgreSQL", value: "postgres", description?: "描述" },
      ...
    ],
    defaultValue?: "postgres",
    required?: true,
    submitLabel?: "Confirm",  // 有值则显示提交按钮；无值则选择即提交
  }
}
// Returns: string
```

### Checkbox

```tsx
{
  component: "checkbox",
  props: {
    title: "Select colors",
    options: [{ label: "Red", value: "red" }, ...],
    min?: 1,   // 最少选择数
    max?: 3,   // 最多选择数
  }
}
// Returns: string[]
```

### Select

```tsx
{
  component: "select",
  props: {
    title: "Pick a framework",
    options: [{ label: "React", value: "react" }, ...],
    placeholder?: "Select...",
    searchable?: true,
  }
}
// Returns: string
```

### Form

```tsx
{
  component: "form",
  props: {
    title: "User Profile",
    fields: [
      { type: "input",    name: "name",     label: "Name",     required: true },
      { type: "textarea", name: "bio",      label: "Bio" },
      { type: "number",   name: "age",      label: "Age",      min: 0 },
      { type: "switch",   name: "active",    label: "Active" },
      { type: "radio",    name: "role",     label: "Role",     options: [...] },
      { type: "select",   name: "country",  label: "Country",  options: [...] },
    ],
    submitLabel?: "Save",
  }
}
// Returns: Record<string, unknown>
```

### Confirm

```tsx
{
  component: "confirm",
  props: {
    title: "Delete item?",
    description?: "This action cannot be undone.",
    confirmLabel?: "Delete",
    cancelLabel?: "Cancel",
    variant?: "destructive",  // 显示红色危险按钮
  }
}
// Returns: boolean
```

### Wizard

```tsx
{
  component: "wizard",
  props: {
    title: "Setup wizard",
    steps: [
      {
        id: "step1",
        title: "Profile",
        fields: [{ type: "input", name: "name", label: "Name" }],
      },
      {
        id: "step2",
        title: "Preferences",
        fields: [{ type: "switch", name: "dark", label: "Dark mode" }],
      },
    ],
    submitLabel?: "Finish",
    allowSkip?: true,
  }
}
// Returns: { step: string, values: Record<string, unknown> }
```

---

## Framework Adapters · 框架适配器

### Assistant UI

```tsx
import { AssistantUIToolRenderer } from "ai-business-ui";
import { makeAssistantToolUI } from "@assistant-ui/react";

export const showUITool = makeAssistantToolUI({
  toolName: "show_ui",
  render: ({ result }) => <AssistantUIToolRenderer result={result} />,
});
```

### Vercel AI SDK

```tsx
import { AIMessageUI } from "ai-business-ui";

{messages.map((m) => (
  <div key={m.id}>
    <AIMessageUI parts={m.parts} />
  </div>
))}
```

`AIMessageUI` 自动识别以下消息片段类型：
- `data-ui` — UIAction JSON 在 `data` 字段
- `tool-show_ui` — UIAction 在 `toolInvocation.result`

### 普通集成（任何框架）

```tsx
import { UIRenderer, registerDefaultComponents } from "ai-business-ui";

// Agent 返回 schema JSON，传入渲染
<UIRenderer
  schema={agentSchema}
  onSubmit={(value) => agent.continue({ toolResult: value })}
/>
```

---

## Adding a New Component · 添加新组件

只需一行注册，无需修改渲染器：

```tsx
import { registerComponent } from "ai-business-ui";
import { z } from "zod";

const myPropsSchema = z.object({
  title: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
});

function MyView({ props, onSubmit }: UIRenderProps) {
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

registerComponent("my-picker", { schema: myPropsSchema, component: MyView });
```

---

## Headless Usage · 无头模式

用自定义组件替换默认样式：

```tsx
import { registerComponent } from "ai-business-ui";
import { radioPropsSchema } from "ai-business-ui";

registerComponent("radio", {
  schema: radioPropsSchema,
  component: MyCustomRadioView,  // 你的组件
});
```

或使用独立 UI 组件构建系统：

```tsx
import { RadioView, CheckboxView, Button } from "ai-business-ui";
```

---

## Examples · 示例

完整示例在 [`src/packages/examples/`](./src/packages/examples)：

1. **Database picker** — `radio` — Agent 让用户选择数据库
2. **Tech-stack wizard** — `wizard` — 多步配置向导
3. **User profile form** — `form` — 复合表单收集用户信息
4. **Confirm delete** — `confirm` — 危险操作二次确认
5. **Product search** — `card` — 多选卡片列表

在线演示：https://ai-business-ui-demo.vercel.app

---

## Development · 开发

```bash
npm install
npm run dev        # demo at http://localhost:5173
npm test            # run all tests
npm run build       # build demo
npm run build:library  # build npm package
```

---

## License

MIT
