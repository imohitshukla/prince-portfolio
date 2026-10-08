import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Panel + project-detail state lives in the URL, so every overlay is
 * deep-linkable and the browser back button closes the topmost layer.
 *
 *   /?panel=work                     → sliding project panel
 *   /?panel=contact                  → sliding contact panel
 *   /work?project=social-media-reel  → project detail overlay
 *
 * Params are supported on every route, so the panels behave like one
 * immersive experience no matter where the visitor clicks from.
 */
export type PanelKind = "work" | "contact";

interface UIContextValue {
  panel: PanelKind | null;
  projectId: string | null;
  menuOpen: boolean;
  openPanel: (kind: PanelKind) => void;
  closePanel: () => void;
  openProject: (id: string) => void;
  closeProject: () => void;
  setMenuOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const rawPanel = params.get("panel");
  const panel: PanelKind | null = rawPanel === "work" || rawPanel === "contact" ? rawPanel : null;
  const projectId = params.get("project");

  const pushed = useRef<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  // If the visitor uses native back / forward instead of our close handlers,
  // forget that we pushed a history entry so we never pop twice.
  useEffect(() => {
    if (panel !== "work") pushed.current["panel:work"] = false;
    if (panel !== "contact") pushed.current["panel:contact"] = false;
    if (!projectId) pushed.current.project = false;
  }, [panel, projectId]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-overlay", Boolean(panel || projectId));
  }, [panel, projectId]);

  const write = useCallback(
    (mutate: (next: URLSearchParams) => void, push: boolean) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next);
          return next;
        },
        { replace: !push }
      );
    },
    [setParams]
  );

  const openPanel = useCallback(
    (kind: PanelKind) => {
      setMenuOpen(false);
      if (panel === kind) return;
      pushed.current[`panel:${kind}`] = true;
      write((next) => {
        next.set("panel", kind);
        next.delete("project");
      }, true);
    },
    [panel, write]
  );

  const closePanel = useCallback(() => {
    if (!panel) return;
    if (pushed.current[`panel:${panel}`]) {
      pushed.current[`panel:${panel}`] = false;
      navigate(-1);
      return;
    }
    write((next) => next.delete("panel"), false);
  }, [navigate, panel, write]);

  const openProject = useCallback(
    (id: string) => {
      if (projectId === id) return;
      pushed.current.project = true;
      write((next) => next.set("project", id), true);
    },
    [projectId, write]
  );

  const closeProject = useCallback(() => {
    if (!projectId) return;
    if (pushed.current.project) {
      pushed.current.project = false;
      navigate(-1);
      return;
    }
    write((next) => next.delete("project"), false);
  }, [navigate, projectId, write]);

  const value = useMemo<UIContextValue>(
    () => ({
      panel,
      projectId,
      menuOpen,
      openPanel,
      closePanel,
      openProject,
      closeProject,
      setMenuOpen,
    }),
    [closePanel, closeProject, menuOpen, openPanel, openProject, panel, projectId]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
