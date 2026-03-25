// src/pages/AdminDashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import { IconDelete, IconEdit } from "../components/Common/Icons";

const INITIAL_USERS = Array(11)
  .fill(null)
  .map((_, index) => ({
    id: index,
    name: "some text",
    email: "mail@gmail.com",
    updateDate: "08/07/2022",
    // Random to test
    status: Math.random() > 0.4 ? "đã kích hoạt" : "chưa kích hoạt",
  }));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // check login when enter page
  useEffect(() => {
    if (!isLoggedIn) {
      alert("Bạn chưa đăng nhập. Vui lòng quay lại!");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AdminLayout userName={currentUser?.username}>
      <div className="content-header">
        <h2>Danh sách</h2>
        <button className="add-btn">Thêm</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Ngày cập nhật</th>
              <th>Trạng Thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_USERS.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.updateDate}</td>
                <td
                  style={{
                    color:
                      user.status === "đã kích hoạt" ? "#2ecc71" : "#f39c12",
                  }}
                >
                  {user.status}
                </td>
                <td className="action-btns">
                  <button className="action-btn edit-btn">
                    <IconEdit />
                  </button>
                  <button className="action-btn remove-btn">
                    <IconDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
