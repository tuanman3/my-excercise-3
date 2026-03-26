import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Layout, ConfigProvider } from "antd";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import "../../styles/Main.css";
const { Sider } = Layout;

const menuItems = [
  {
    key: "/admin/dashboard",
    icon: <UserOutlined />,
    label: "Danh sách người dùng",
  },
  {
    key: "/admin/products",
    icon: <AppstoreOutlined />,
    label: "Danh sách sản phẩm",
  },
];

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint="lg"
      width={300}
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        background: "#3F4E4F",
      }}
    >
      <div
        className="header-sidebar"
        style={{
          fontSize: collapsed ? 14 : 18,
        }}
      >
        {collapsed ? "M" : "MENU"}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemSelectedBg: "#DCD7C9", // background when active
              darkItemHoverBg: "#dcd7c934", // background when hover
              darkItemSelectedColor: "#000", // text color when active
              darkItemHoverColor: "#DCD7C9", // text color when hover
              itemMarginBlock: "12px",
              itemHeight: "60px",
            },
          },
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            paddingTop: "10px",
            fontWeight: "700",
            margin: "0 auto",
            width: "90%",
            background: "transparent",
          }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default Sidebar;
