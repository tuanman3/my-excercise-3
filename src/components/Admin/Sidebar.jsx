import { useNavigate, useLocation } from "react-router-dom";
import { IconMenu, IconProduct, IconUser } from "../Common/Icons";

const menuItems = [
  {
    key: "/admin/dashboard",
    icon: <IconUser />,
    label: "Danh sách người dùng",
  },
  {
    key: "/admin/products",
    icon: <IconProduct />,
    label: "Danh sách sản phẩm",
  },
];

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`admin-sidebar ${!collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {collapsed && (
          <>
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              <IconMenu />
            </button>
          </>
        )}
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`sidebar-menu-item ${location.pathname === item.key ? "active" : ""}`}
            onClick={() => navigate(item.key)}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {collapsed && (
              <span style={{ fontWeight: "700" }}>{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
