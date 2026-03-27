// src/components/Admin/Header.jsx
import { useSelector } from "react-redux";
import { IconMenu } from "../Common/Icons";
import LogoutModal from "./LogoutModal";

const Header = ({ collapsed, toggleSidebar, onLogout, onUpdateAvatar }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const defaultAvatar = `https://ui-avatars.com/api/?name=${currentUser?.username || "A"}&background=random`;

  return (
    <header className="admin-header">
      <div className="header-left">
        {!collapsed && (
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            <IconMenu />
          </button>
        )}
      </div>

      <div className="header-right">
        <div className="admin-info">
          <span className="admin-name">{currentUser?.username || "Admin"}</span>

          <img
            src={currentUser?.avatar || defaultAvatar}
            className="user-avatar-header"
            alt="Admin Avatar"
            onClick={onUpdateAvatar}
            style={{ cursor: "pointer" }}
            title="Đổi ảnh đại diện"
          />
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <LogoutModal />
          <span className="hide-mobile">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
