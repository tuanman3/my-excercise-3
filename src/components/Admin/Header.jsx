import { IconMenu } from "../Common/Icons";

const Header = ({ toggleSidebar, onLogout, userName, onUpdateAvatar }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const defaultAvatar = `https://ui-avatars.com/api/?name=${userName}&background=random`;

  return (
    <header className="admin-header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          <IconMenu />
        </button>
      </div>
      <div className="header-right">
        <div className="admin-info">
          <span className="admin-name">{userName || "Admin"}</span>
          <img
            src={currentUser?.avatar || defaultAvatar}
            className="user-avatar-header"
            alt="Admin Avatar"
            onClick={onUpdateAvatar}
            style={{ cursor: "pointer" }}
            title="Đổi ảnh đại diện"
          />
        </div>
        <button onClick={onLogout} className="logout-btn">
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
