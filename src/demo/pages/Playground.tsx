import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { UIRenderer } from "../../packages/core/index.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../packages/components/index.js";
import { Button } from "../../packages/components/index.js";
import { defaultSchema } from "./playgroundSeed.js";

export function PlaygroundPage() {
  const { t } = useTranslation();
  const [text, setText] = useState(JSON.stringify(defaultSchema, null, 2));
  const [result, setResult] = useState<unknown>(undefined);

  const parsed = useMemo(() => {
    try {
      const v = JSON.parse(text);
      return { ok: true as const, value: v };
    } catch (e) {
      return { ok: false as const, error: (e as Error).message };
    }
  }, [text]);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t("playground.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("playground.subtitle")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("playground.schema_json")}</CardTitle>
            <CardDescription>{t("playground.schema_shape")}</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              className="w-full h-[420px] rounded-md border bg-background p-3 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="mt-2 flex justify-between items-center text-xs">
              <div
                className={
                  parsed.ok ? "text-emerald-600" : "text-destructive"
                }
              >
                {parsed.ok ? t("playground.valid_json") : `✗ ${parsed.error}`}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setText(JSON.stringify(defaultSchema, null, 2))}
              >
                {t("playground.reset")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("common.render")}</CardTitle>
            <CardDescription>{t("playground.live_output")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!parsed.ok && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                {t("playground.fix_json")}
              </div>
            )}
            {parsed.ok && (
              <UIRenderer
                schema={parsed.value}
                onSubmit={(v) => setResult(v)}
                onCancel={() => setResult(t("common.cancelled"))}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("common.result")}</CardTitle>
          <CardDescription>{t("playground.result_desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">
            {result !== undefined
              ? JSON.stringify(result, null, 2)
              : t("common.interact")}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
