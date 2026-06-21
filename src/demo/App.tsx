import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/index.js";
import { useHashRoute } from "./useHashRoute.js";
import { Sidebar } from "./components/Sidebar.js";
import { HomePage } from "./pages/Home.js";
import { ComponentsPage } from "./pages/Components.js";
import { PlaygroundPage } from "./pages/Playground.js";
import { AssistantUIDemo } from "./pages/AssistantUIDemo.js";
import { AISDKDemo } from "./pages/AISDKDemo.js";
import { ExamplesPage } from "./pages/Examples.js";
import { registerDefaultComponents } from "../packages/components/index.js";

// Register all built-in HITL components once at app boot.
registerDefaultComponents();

export default function App() {
  const { path, navigate } = useHashRoute();

  useEffect(() => {
    document.title = `AI Business UI — ${i18n.t(titleKey(path))}`;
  }, [path]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex h-full">
        <Sidebar currentPath={path} navigate={navigate} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-8">
            {renderPage(path, navigate)}
          </div>
        </main>
      </div>
    </I18nextProvider>
  );
}

function renderPage(path: string, navigate: (to: string) => void) {
  if (path === "/" || path === "") return <HomePage navigate={navigate} />;
  if (path.startsWith("/components")) return <ComponentsPage />;
  if (path.startsWith("/playground")) return <PlaygroundPage />;
  if (path.startsWith("/assistant-ui")) return <AssistantUIDemo />;
  if (path.startsWith("/ai-sdk")) return <AISDKDemo />;
  if (path.startsWith("/examples")) return <ExamplesPage />;
  return (
    <div className="text-sm text-muted-foreground">
      {i18n.t("title.not_found")}.{" "}
      <button className="underline" onClick={() => navigate("/")}>
        {i18n.t("nav.home")}
      </button>
    </div>
  );
}

function titleKey(path: string): string {
  if (path === "/" || path === "") return "title.overview";
  if (path.startsWith("/components")) return "title.components";
  if (path.startsWith("/playground")) return "title.playground";
  if (path.startsWith("/assistant-ui")) return "title.assistant_ui";
  if (path.startsWith("/ai-sdk")) return "title.ai_sdk";
  if (path.startsWith("/examples")) return "title.examples";
  return "title.not_found";
}
