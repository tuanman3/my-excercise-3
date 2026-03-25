import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/Admin.css";
import LogoutModal from "./LogoutModal";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children, userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-wrapper">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="admin-main">
        <Header
          toggleSidebar={toggleSidebar}
          onLogout={() => setIsLogoutModalOpen(true)}
          userName={userName}
        />

        <div className="content-wrapper">
          {children} {/* where render user page hoặc products */}
        </div>
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
