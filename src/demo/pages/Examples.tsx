import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UIRenderer } from "../../packages/core/index.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../packages/components/index.js";
import {
  databasePicker,
  techStackWizard,
  userProfileForm,
  productSearch,
  type ExampleFlow,
} from "../../packages/examples/index.js";

export function ExamplesPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, unknown>>({});

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t("examples.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("examples.subtitle")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXAMPLES.map((ex) => (
          <Card key={ex.id} className={active === ex.id ? "ring-2 ring-primary" : ""}>
            <CardHeader>
              <CardTitle>{ex.title}</CardTitle>
              <CardDescription>{ex.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => setActive(active === ex.id ? null : ex.id)}
                className="text-xs text-primary hover:underline"
              >
                {active === ex.id ? t("examples.hide") : t("examples.show")} →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {EXAMPLES.map((ex) =>
        active === ex.id ? (
          <ExampleDetail
            key={ex.id}
            example={ex}
            result={results[ex.id]}
            onResult={(v) => setResults((r) => ({ ...r, [ex.id]: v }))}
            t={t}
          />
        ) : null,
      )}
    </div>
  );
}

function ExampleDetail({
  example,
  result,
  onResult,
  t,
}: {
  example: ExampleFlow;
  result: unknown;
  onResult: (v: unknown) => void;
  t: ReturnType<typeof useTranslation>["t"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{example.title}</CardTitle>
        <CardDescription>{example.longDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Step label={t("examples.user_says")} body={example.userSays} />
        <Step label={t("examples.agent_emits")} body={JSON.stringify(example.schema, null, 2)} mono />
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            {t("common.render")}
          </div>
          <UIRenderer
            schema={example.schema}
            onSubmit={onResult}
            onCancel={() => onResult(t("common.cancelled"))}
          />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            {t("examples.submitted")}
          </div>
          <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">
            {result !== undefined ? JSON.stringify(result, null, 2) : t("common.interact")}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

function Step({ label, body, mono }: { label: string; body: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className={"rounded-md bg-muted p-3 text-sm" + (mono ? " font-mono text-xs" : "")}>
        {body}
      </div>
    </div>
  );
}

const EXAMPLES: ExampleFlow[] = [
  databasePicker,
  techStackWizard,
  userProfileForm,
  productSearch,
];
