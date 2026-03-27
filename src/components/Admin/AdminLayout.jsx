import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/Admin.css";
import LogoutModal from "./LogoutModal";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children, userName, onUpdateAvatar }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="admin-wrapper">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className={`admin-main ${collapsed ? "full-width" : ""}`}>
        <Header
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          onLogout={() => setIsLogoutModalOpen(true)}
          userName={userName}
          onUpdateAvatar={onUpdateAvatar}
        />
        <div className="content-wrapper">{children}</div>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AdminLayout;
