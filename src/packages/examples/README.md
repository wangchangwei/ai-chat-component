# Examples — Five Worked Agent Flows

These examples show the full loop: a user prompt, the JSON schema the agent
emits, the rendered UI, and the value the user submits back. They are usable
directly from the demo app (`/examples` page) and from your own runtime.

---

## 1. Database picker (radio)

**User says:** *“I want to create a website.”*

**Agent emits:**
```json
{
  "component": "radio",
  "props": {
    "title": "Pick a database",
    "options": [
      { "label": "PostgreSQL", "value": "postgres" },
      { "label": "MySQL",      "value": "mysql" }
    ]
  }
}
```

**Returned to agent:** `"postgres"`

---

## 2. Tech-stack wizard (wizard)

**User says:** *“Recommend a tech stack for my new SaaS.”*

**Agent emits:** a `wizard` schema with three steps (framework, deployment,
team size).

**Returned to agent:**
```json
{
  "currentStep": 2,
  "values": { "framework": "next", "deploy": "vercel", "teamSize": 3, "ssr": true }
}
```

The agent now has enough to recommend a stack.

---

## 3. User profile form (form)

**User says:** *“Update my profile.”*

**Agent emits:** a `form` schema with mixed field types (input, textarea,
switch, radio, checkbox).

**Returned to agent:**
```json
{
  "displayName": "Ada",
  "bio": "Mathematician. Working on AI agents.",
  "role": "engineer",
  "newsletter": true,
  "interests": ["ai", "devtools"]
}
```

---

## 4. Confirm delete (confirm)

**User says:** *“Delete the project.”*

**Agent emits:** a destructive `confirm` schema.

**Returned to agent:** `true` (or `false` if the user cancelled)

---

## 5. Product search (card)

**User says:** *“Find me a laptop under $1500.”*

**Agent emits:** a `card` schema with selectable + multi items.

**Returned to agent:** `["mbp14", "framework"]`

---

## Wiring an example into your own app

```ts
import { registerDefaultComponents } from "@ai-business-ui/components";
import { UIRenderer } from "@ai-business-ui/core";
import { databasePicker } from "@ai-business-ui/examples";

registerDefaultComponents();

<UIRenderer
  schema={databasePicker.schema}
  onSubmit={(value) => sendToAgent(value)}
/>
```
