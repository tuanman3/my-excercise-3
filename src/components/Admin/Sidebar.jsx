import { useNavigate, useLocation } from "react-router-dom";
import { IconProduct, IconUser } from "../Common/Icons";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Danh sách người dùng",
      path: "/admin/dashboard",
      icon: <IconUser />,
    },
    {
      name: "Danh sách sản phẩm",
      path: "/admin/products",
      icon: <IconProduct />,
    },
  ];

  return (
    <div className={`admin-sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-header">{isOpen && <span>MENU</span>}</div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`sidebar-menu-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {isOpen && <span style={{ fontWeight: "700" }}>{item.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
