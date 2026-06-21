import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UIRenderer } from "../../packages/core/index.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../packages/components/index.js";
import { databasePicker, techStackWizard, userProfileForm, productSearch } from "../../packages/examples/index.js";
import type { UIAction } from "../../packages/core/schema/base.js";

export function ComponentsPage() {
  const { t } = useTranslation();
  const [results, setResults] = useState<Record<string, unknown>>({});

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t("components.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("components.subtitle")}
        </p>
      </header>

      <Section
        title="Database picker"
        description="A radio choice — the agent asks the user which database to provision."
        schema={databasePicker.schema}
        resultKey="database"
        results={results}
        setResults={setResults}
        t={t}
      />

      <Section
        title="Tech-stack wizard"
        description="A multi-step wizard collects framework, deployment target, and team size."
        schema={techStackWizard.schema}
        resultKey="wizard"
        results={results}
        setResults={setResults}
        t={t}
      />

      <Section
        title="User profile form"
        description="A composed form with input, switch, radio, and checkbox fields."
        schema={userProfileForm.schema}
        resultKey="form"
        results={results}
        setResults={setResults}
        t={t}
      />

      <Section
        title="Product search"
        description="A multi-select card grid for choosing products."
        schema={productSearch.schema}
        resultKey="card"
        results={results}
        setResults={setResults}
        t={t}
      />
    </div>
  );
}

function Section({
  title,
  description,
  schema,
  resultKey,
  results,
  setResults,
  t,
}: {
  title: string;
  description: string;
  schema: UIAction;
  resultKey: string;
  results: Record<string, unknown>;
  setResults: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  t: ReturnType<typeof useTranslation>["t"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-md bg-muted p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            {t("common.schema")}
          </div>
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(schema, null, 2)}
          </pre>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            {t("common.render")}
          </div>
          <UIRenderer
            key={resultKey}
            schema={schema}
            onSubmit={(value) =>
              setResults((r) => ({ ...r, [resultKey]: value }))
            }
            onCancel={() =>
              setResults((r) => ({ ...r, [resultKey]: t("common.cancelled") }))
            }
          />
        </div>
        <div className="rounded-md bg-muted p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            {t("common.result")}
          </div>
          <pre className="text-xs">
            {results[resultKey] !== undefined
              ? JSON.stringify(results[resultKey], null, 2)
              : t("common.interact")}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
