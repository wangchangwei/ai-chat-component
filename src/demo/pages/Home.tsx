import { useTranslation } from "react-i18next";
import { Button } from "../../packages/components/index.js";

export function HomePage({ navigate }: { navigate: (to: string) => void }) {
  const { t } = useTranslation();

  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">AI Business UI</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        {t("home.tagline")}
      </p>

      <section className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{t("home.gap_title")}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("home.gap_body")}
        </p>
      </section>

      <section className="mt-6 rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{t("home.contract_title")}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {t("home.contract_body")}
        </p>
        <pre className="rounded-md bg-muted px-3 py-2 text-xs overflow-x-auto">
{`{
  "component": "radio",
  "props": {
    "title": "Pick a database",
    "options": [
      { "label": "Postgres", "value": "postgres" },
      { "label": "MySQL",    "value": "mysql" }
    ]
  }
}`}
        </pre>
      </section>

      <section className="mt-6 rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{t("home.what_you_get")}</h2>
        <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
          <li>{t("home.feature_0")}</li>
          <li>{t("home.feature_1")}</li>
          <li>{t("home.feature_2")}</li>
          <li>{t("home.feature_3")}</li>
          <li>{t("home.feature_4")}</li>
          <li>{t("home.feature_5")}</li>
        </ul>
      </section>

      <div className="mt-8 flex gap-2">
        <Button onClick={() => navigate("/components")}>
          {t("home.btn_browse")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/playground")}>
          {t("home.btn_playground")}
        </Button>
      </div>
    </article>
  );
}
