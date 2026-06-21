import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UIRenderer } from "../../packages/core/index.js";
import { AIMessageUI, type AIMessagePartLike } from "../../packages/adapter-ai-sdk/index.js";
import type { UIAction } from "../../packages/core/schema/base.js";
import { databasePicker } from "../../packages/examples/index.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "../../packages/components/index.js";
import { cn } from "../../lib/utils.js";

/**
 * Demo of the Vercel AI SDK adapter. Mirrors the shape of a real chat message
 * (parts array) and shows how AIMessageUI extracts and renders UIAction parts.
 */
export function AISDKDemo() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<DemoMsg[]>([
    {
      role: "user",
      parts: [{ type: "text", text: "I want to create a website." }],
    },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg: DemoMsg = {
      role: "user",
      parts: [{ type: "text", text: input }],
    };
    const aiMsg: DemoMsg = {
      role: "assistant",
      parts: [
        { type: "text", text: "Sure — pick a database to scaffold your backend:" },
        { type: "data-ui", data: databasePicker.schema },
      ],
    };
    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  }

  function submit(value: unknown) {
    setMessages((m) => [
      ...m,
      {
        role: "tool",
        parts: [
          {
            type: "text",
            text: `Tool result received: ${JSON.stringify(value)}`,
          },
        ],
      },
      {
        role: "assistant",
        parts: [
          {
            type: "text",
            text: `Continuing the workflow with \`${JSON.stringify(value)}\`...`,
          },
        ],
      },
    ]);
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t("ai_sdk.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("ai_sdk.subtitle")}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("ai_sdk.chat_thread")}</CardTitle>
          <CardDescription>{t("ai_sdk.hints")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 min-h-[260px]">
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} onSubmit={submit} />
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button onClick={send}>{t("common.submit")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface DemoMsg {
  role: "user" | "assistant" | "tool";
  parts: AIMessagePartLike[];
}

function Bubble({ msg, onSubmit }: { msg: DemoMsg; onSubmit: (v: unknown) => void }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm space-y-2",
          isUser ? "bg-primary text-primary-foreground" : "bg-card border",
        )}
      >
        {msg.parts.map((p, i) => {
          if (p.type === "text") {
            return <div key={i}>{p.text}</div>;
          }
          if (p.type === "data-ui") {
            return (
              <div key={i}>
                <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">
                  AIMessageUI → UIRenderer
                </div>
                <UIRenderer schema={p.data as UIAction} onSubmit={onSubmit} />
              </div>
            );
          }
          if (p.type === "tool-show_ui" && p.toolInvocation?.result) {
            return (
              <div key={i}>
                <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">
                  AIMessageUI → UIRenderer
                </div>
                <UIRenderer
                  schema={p.toolInvocation.result as UIAction}
                  onSubmit={onSubmit}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
