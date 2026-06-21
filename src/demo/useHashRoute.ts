import { useEffect, useState } from "react";

/**
 * Tiny hash-based router — no extra dep, just enough for a demo SPA.
 * Reads `#/path` and exposes the current path; navigates by setting `location.hash`.
 */
export function useHashRoute(): { path: string; navigate: (to: string) => void } {
  const [path, setPath] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    function onChange() {
      setPath(parseHash(window.location.hash));
    }
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return {
    path,
    navigate: (to: string) => {
      const next = to.startsWith("#") ? to : `#${to.startsWith("/") ? to : `/${to}`}`;
      if (window.location.hash !== next) window.location.hash = next;
    },
  };
}

function parseHash(hash: string): string {
  if (!hash) return "/";
  return hash.startsWith("#") ? hash.slice(1) : hash;
}
