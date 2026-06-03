export interface NavItem<T extends string> {
  key: T;
  label: string;
  description: string;
  icon: string;
}

interface SidebarProps<T extends string> {
  activeView: T;
  activeNavView?: T;
  nav: NavItem<T>[];
  onSelectView: (view: T) => void;
}

export function Sidebar<T extends string>({ activeView, activeNavView = activeView, nav, onSelectView }: SidebarProps<T>) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge">
          <img src="/icons/sidebar/brand-shield.svg" alt="" aria-hidden="true" />
        </div>
        <div>
          <div className="brand-kicker">VulnClaw</div>
          <h1>VulnClaw</h1>
          <p>Scan workspace</p>
        </div>
      </div>

      <nav className="nav-list" aria-label="main navigation">
        {nav.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`nav-item ${activeNavView === item.key ? "active" : ""}`}
            onClick={() => onSelectView(item.key)}
          >
            <span className="nav-icon" aria-hidden="true">
              <img src={item.icon} alt="" />
            </span>
            <span>
              <strong>{item.label}</strong>
              {item.description && <small>{item.description}</small>}
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>Local</span>
        <strong>Ready</strong>
      </div>
    </aside>
  );
}
