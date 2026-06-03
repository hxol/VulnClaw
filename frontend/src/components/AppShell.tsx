import type { ReactNode } from "react";
import type { TaskEvent, TaskRecord } from "../types/api";
import { ActiveTaskBanner } from "./ActiveTaskBanner";
import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";

interface ViewMeta {
  eyebrow: string;
  title: string;
  copy: string;
}

interface AppShellProps<T extends string> {
  activeView: T;
  activeNavView?: T;
  nav: NavItem<T>[];
  meta: ViewMeta;
  backendUnavailable?: boolean;
  backendError?: string;
  onRetryBackend?: () => void;
  selectedTarget: string | null;
  activeTask: TaskRecord | null;
  latestEvent: TaskEvent | null;
  onSelectView: (view: T) => void;
  onOpenAdvanced: () => void;
  onOpenBoundary: () => void;
  onOpenReports: () => void;
  onOpenTarget: (target: string) => void;
  onStopTask: () => void;
  children: ReactNode;
}

export function AppShell<T extends string>({
  activeView,
  activeNavView,
  nav,
  meta,
  backendUnavailable = false,
  backendError,
  onRetryBackend,
  selectedTarget,
  activeTask,
  latestEvent,
  onSelectView,
  onOpenAdvanced,
  onOpenBoundary,
  onOpenReports,
  onOpenTarget,
  onStopTask,
  children,
}: AppShellProps<T>) {
  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} activeNavView={activeNavView} nav={nav} onSelectView={onSelectView} />
      <main className="workspace">
        <Topbar
          eyebrow={meta.eyebrow}
          title={meta.title}
          copy={meta.copy}
          selectedTarget={selectedTarget}
          activeTaskStatus={activeTask?.status}
        />
        {backendUnavailable && (
          <section className="connection-banner" role="status">
            <div>
              <strong>Backend unavailable</strong>
              <span>
                Start <code>vulnclaw web</code> and open the local address to load the live console.
              </span>
              {backendError && <small>{backendError}</small>}
            </div>
            {onRetryBackend && (
              <button className="secondary-btn" onClick={onRetryBackend} type="button">
                Retry
              </button>
            )}
          </section>
        )}
        <ActiveTaskBanner
          task={activeTask}
          latestEvent={latestEvent}
          onOpenAdvanced={onOpenAdvanced}
          onOpenBoundary={onOpenBoundary}
          onOpenReports={onOpenReports}
          onOpenTarget={onOpenTarget}
          onStop={onStopTask}
        />
        <div className="view-mount">{children}</div>
      </main>
    </div>
  );
}
