
import { Menu, Bell, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ openMenu, notificationCount }) {

  const navigate = useNavigate();

  function handleBellClick() {
    navigate("/requests?filter=unread");
  }

  return (
    <header className="top-navbar">
      <button className="menu-button" onClick={openMenu}>
        <Menu size={23} />
      </button>

      <div className="navbar-search">
        <Search size={18} />
        <span>Business Service Management System</span>
      </div>

      <div className="navbar-actions">
        <button
          className="notification-button"
          onClick={handleBellClick}
          aria-label={`${notificationCount} unread requests`}
        >
          <Bell size={20} />

          {notificationCount > 0 && (
            <span className="notification-badge">
              {/* {notificationCount} */}
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        <div className="profile">
          <div className="profile-avatar">AD</div>
          <div className="profile-info">
            <strong>Administrator</strong>
            <span>Service Manager</span>
          </div>
        </div>

        <Link to="/create" className="navbar-create">
          + New Request
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
