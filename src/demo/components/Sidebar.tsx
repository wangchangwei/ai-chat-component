import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils.js";

export function Sidebar({
  currentPath,
  navigate,
}: {
  currentPath: string;
  navigate: (to: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  function toggleLang() {
    const next = currentLang === "en" ? "zh" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("ai-business-ui-lang", next);
  }

  return (
    <aside className="w-64 shrink-0 border-r bg-card/30 h-full overflow-y-auto">
      <div className="p-4 border-b">
        <div className="text-sm font-semibold tracking-tight">AI Business UI</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {t("home.tagline")}
        </div>
      </div>
      <nav className="p-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active =
            item.path === "/"
              ? currentPath === "/" || currentPath === ""
              : currentPath.startsWith(item.path);
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full text-left rounded-md px-3 py-2 transition-colors",
                "hover:bg-accent",
                active && "bg-accent",
              )}
            >
              <div className="text-sm font-medium leading-none">{t(item.labelKey)}</div>
              <div className="text-xs text-muted-foreground mt-1">{t(item.descKey)}</div>
            </button>
          );
        })}
      </nav>
      <div className="px-4 py-3 mt-2 border-t space-y-2">
        <button
          type="button"
          onClick={toggleLang}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <span>{t("sidebar.language")}</span>
          <span className="ml-auto font-medium">
            {currentLang === "en" ? "EN" : "中"}
          </span>
        </button>
        <a
          href="https://github.com/wangchangwei/ai-chat-component"
          className="block text-xs text-muted-foreground hover:underline"
        >
          {t("sidebar.github")} →
        </a>
      </div>
    </aside>
  );
}

const NAV_ITEMS = [
  { path: "/", labelKey: "nav.home", descKey: "nav.home_desc" },
  { path: "/components", labelKey: "nav.components", descKey: "nav.components_desc" },
  { path: "/playground", labelKey: "nav.playground", descKey: "nav.playground_desc" },
  { path: "/assistant-ui", labelKey: "nav.assistant_ui", descKey: "nav.assistant_ui_desc" },
  { path: "/ai-sdk", labelKey: "nav.ai_sdk", descKey: "nav.ai_sdk_desc" },
  { path: "/examples", labelKey: "nav.examples", descKey: "nav.examples_desc" },
];
