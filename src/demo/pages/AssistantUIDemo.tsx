import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UIRenderer } from "../../packages/core/index.js";
import { AssistantUIToolRenderer } from "../../packages/adapter-assistant-ui/index.js";
import type { UIAction } from "../../packages/core/schema/base.js";
import { databasePicker } from "../../packages/examples/index.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "../../packages/components/index.js";
import { cn } from "../../lib/utils.js";

export function AssistantUIDemo() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<DemoMessage[]>([
    { role: "user", content: "I want to create a website." },
  ]);
  const [input, setInput] = useState("");
  const [pendingTool, setPendingTool] = useState<UIAction | null>(null);

  function send() {
    if (!input.trim()) return;
    const userMsg: DemoMessage = { role: "user", content: input };
    const next: DemoMessage[] = [...messages, userMsg];
    setMessages(next);
    setInput("");

    if (/database|db|website/i.test(input)) {
      setPendingTool(databasePicker.schema);
      const toolMsg: DemoMessage = {
        role: "assistant",
        content: "Pick a database to scaffold:",
        toolResult: databasePicker.schema,
      };
      setMessages([...next, toolMsg]);
    } else {
      const aiMsg: DemoMessage = {
        role: "assistant",
        content: "Tell me what to do — try 'pick a database' or 'create a website'.",
      };
      setMessages([...next, aiMsg]);
    }
  }

  function onResult(value: unknown) {
    if (!pendingTool) return;
    const asString = typeof value === "boolean" ? String(value) : JSON.stringify(value);
    const toolMsg: DemoMessage = { role: "tool-result", content: `User submitted: ${asString}` };
    setMessages((m) => [...m, toolMsg]);
    const reply: DemoMessage = {
      role: "assistant",
      content: `Got it — continuing the workflow with \`${asString}\`.`,
    };
    setMessages((m) => [...m, reply]);
    setPendingTool(null);
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t("assistant_ui.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("assistant_ui.subtitle")}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("assistant_ui.chat_thread")}</CardTitle>
          <CardDescription>{t("assistant_ui.hints")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 min-h-[260px]">
            {messages.map((m, i) => (
              <ChatBubble key={i} msg={m} />
            ))}
          </div>
          {pendingTool && (
            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                ← AssistantUIToolRenderer
              </div>
              <AssistantUIToolRenderer result={pendingTool} />
              <details className="mt-3">
                <summary className="text-xs text-muted-foreground cursor-pointer">
                  Show underlying UIRenderer
                </summary>
                <div className="mt-2">
                  <UIRenderer schema={pendingTool} onSubmit={onResult} />
                </div>
              </details>
            </div>
          )}
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

interface DemoMessage {
  role: "user" | "assistant" | "tool-result";
  content: string;
  toolResult?: UIAction;
}

function ChatBubble({ msg }: { msg: DemoMessage }) {
  if (msg.role === "tool-result") {
    return <div className="rounded-md bg-muted px-3 py-2 text-xs">{msg.content}</div>;
  }
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-card border",
        )}
      >
        <div>{msg.content}</div>
        {msg.toolResult && (
          <pre className="mt-2 rounded bg-background/60 p-2 text-[10px] text-foreground overflow-x-auto">
            {JSON.stringify(msg.toolResult, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
