// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import { IconDelete, IconEdit } from "../components/Common/Icons";
import UserModal from "../components/Admin/UserModal";
import AvatarModal from "../components/Admin/AvatarModel";

const AdminDashboard = () => {
  const [notify, setNotify] = useState({ show: false, msg: "", type: "" });
  const navigate = useNavigate();

  const [isLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );
  const [currentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")),
  );

  // --- STATE MANAGE AVATAR ADMIN ---
  const [isAdminAvatarModalOpen, setIsAdminAvatarModalOpen] = useState(false);

  // --- UPDATE AVATAR ADMIN ---
  const handleSaveAdminAvatar = (newLink) => {
    // update into root users (userList) for login the next time
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const updatedList = userList.map((u) =>
      u.username === currentUser.username ? { ...u, avatar: newLink } : u,
    );
    localStorage.setItem("userList", JSON.stringify(updatedList));

    // update into current session
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, avatar: newLink }),
    );

    // close modal
    setIsAdminAvatarModalOpen(false);

    // reload
    window.location.reload();
  };

  // state user
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("userListData");
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // check login when enter page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // update localStorage when users array change
  useEffect(() => {
    localStorage.setItem("userListData", JSON.stringify(users));
  }, [users]);

  // Feature: Save (Add or Edit)
  const handleSaveUser = (data) => {
    if (editingUser) {
      // Logic edit
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...data,
                id: editingUser.id,
                updateDate: new Date().toLocaleDateString(),
              } // keep id
            : u,
        ),
      );
      setNotify({ show: true, msg: "Cập nhật thành công!", type: "success" });
    } else {
      // Logic add
      const newUser = {
        ...data,
        id: Date.now(),
        updateDate: new Date().toLocaleDateString(),
      };
      setUsers([...users, newUser]);
      setNotify({
        show: true,
        msg: "Thêm người dùng mới thành công!",
        type: "success",
      });
    }

    // hidden auto noti after 3s
    setTimeout(() => setNotify((prev) => ({ ...prev, show: false })), 3000);

    setIsModalOpen(false);
    setEditingUser(null);
  };

  // Feature: Delete
  const handleRemove = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Feature: Open edit form
  const handleEdit = (userItem) => {
    setEditingUser(userItem);
    setIsModalOpen(true);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AdminLayout
      userName={currentUser?.username}
      onUpdateAvatar={() => setIsAdminAvatarModalOpen(true)}
    >
      <div className="content-header">
        <h2>Danh sách</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm
        </button>
      </div>

      {notify.show && (
        <div className={`notify notify-${notify.type}`}>{notify.msg}</div>
      )}

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
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              users.map((item, index) => (
                <tr key={item.id ?? index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.updateDate}</td>
                  <td
                    style={{
                      color:
                        item.status === "đã kích hoạt" ? "#2ecc71" : "#f39c12",
                    }}
                  >
                    {item.status}
                  </td>
                  <td className="action-btns">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <IconEdit />
                    </button>
                    <button
                      className="action-btn remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      <IconDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Admin change Avatar */}
      <AvatarModal
        isOpen={isAdminAvatarModalOpen}
        onClose={() => setIsAdminAvatarModalOpen(false)}
        currentAvatar={currentUser?.avatar}
        onSave={handleSaveAdminAvatar}
      />

      {/* Modal for Add-Edit User */}
      <UserModal
        key={editingUser ? editingUser.id : "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
