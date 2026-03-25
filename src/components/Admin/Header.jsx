import { IconMenu } from "../Common/Icons";

const Header = ({ toggleSidebar, onLogout, userName }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          <IconMenu />
        </button>
      </div>
      <div className="header-right">
        <span style={{ marginRight: "10px" }}>{userName}</span>
        <img
          src="https://ui-avatars.com/api/?name=User&background=random"
          alt="avatar"
          className="user-avatar"
        />
        <button onClick={onLogout} className="logout-btn">
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
