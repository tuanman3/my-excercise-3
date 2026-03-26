import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

import Header from "./Header";
import Sidebar from "./Sidebar";
import AvatarModal from "./AvatarModal";
import ConfirmModal from "../Common/ConfirmModal";
import Notification from "../Common/Notification";
import { logout, updateAvatar } from "../../store/authSlice";

const { Content } = Layout;

/**
 general layout for admin pages
 management: toggle sidebar, logout modal, avatar modal
**/
const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true",
  );

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebarCollapsed", String(next));
  };

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSaveAvatar = (newLink) => {
    dispatch(updateAvatar(newLink));
    setAvatarOpen(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Notification />

      <Sidebar collapsed={collapsed} />

      <Layout>
        <Header
          collapsed={collapsed}
          onToggle={handleToggle}
          onLogout={() => setLogoutOpen(true)}
          onUpdateAvatar={() => setAvatarOpen(true)}
          style={{ background: "#2C3639" }}
        />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>

      {/* Logout confirm */}
      <ConfirmModal
        open={logoutOpen}
        title="Xác nhận đăng xuất"
        description="Bạn có chắc chắn muốn rời khỏi hệ thống không?"
        confirmText="Đăng xuất"
        danger
        onConfirm={handleLogout}
        onCancel={() => setLogoutOpen(false)}
      />

      {/* Avatar modal */}
      <AvatarModal
        key={String(avatarOpen)}
        open={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        currentAvatar={currentUser?.avatar}
        onSave={handleSaveAvatar}
      />
    </Layout>
  );
};

export default AdminLayout;
