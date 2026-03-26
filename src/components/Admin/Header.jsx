import { useSelector } from "react-redux";
import { Layout, Avatar, Button, Tooltip, Typography, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ collapsed, onToggle, onLogout, onUpdateAvatar }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const defaultAvatar = `https://ui-avatars.com/api/?name=${currentUser?.username || "A"}&background=random`;

  return (
    <AntHeader
      style={{
        background: "#2C3639",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Toggle sidebar */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{ fontSize: 18, color: "#fff" }}
      />

      {/* Right: Avatar + Username + Logout */}
      <Space size="middle">
        <Text
          strong
          style={{ display: { xs: "none", sm: "inline" }, color: "#fff" }}
        >
          {currentUser?.username || "Admin"}
        </Text>

        <Tooltip title="Đổi ảnh đại diện">
          <Avatar
            src={currentUser?.avatar || defaultAvatar}
            icon={<UserOutlined />}
            style={{ cursor: "pointer", backgroundColor: "#dbcda6" }}
            onClick={onUpdateAvatar}
          />
        </Tooltip>

        <Button
          type="text"
          danger
          icon={<LogoutOutlined />}
          onClick={onLogout}
          style={{ transition: "all 0.2s" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff4d4f";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "";
          }}
        >
          <span className="hide-mobile">Đăng xuất</span>
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
