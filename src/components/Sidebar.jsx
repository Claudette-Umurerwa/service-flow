
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Building2,
  X,
} from "lucide-react";

function Sidebar({ menuOpen, closeMenu }) {
  const appName = import.meta.env.VITE_APP_NAME || "ServiceFlow";
  const description =
    import.meta.env.VITE_APP_DESCRIPTION || "Business Service Management System";

  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "All Requests", path: "/requests", icon: ClipboardList },
    { name: "Create Request", path: "/create", icon: PlusCircle },
    { name: "Departments", path: "/departments", icon: Building2 },
  ];

  return (
    <>
      {menuOpen && (
        <div className="sidebar-overlay" onClick={closeMenu}></div>
      )}

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">SF</div>
          <div>
            <h2>{appName}</h2>
            <span>{description}</span>
          </div>

          <button className="close-sidebar" onClick={closeMenu}>
            <X size={20} />
          </button>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="sidebar-links">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                <Icon size={19} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-avatar">SF</div>
          <div>
            <strong>ServiceFlow</strong>
            <span>Simplifying requests. Improving service delivery.</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
