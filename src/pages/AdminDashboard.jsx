import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import {
  IconDelete,
  IconEdit,
  IconView,
  IconPlus,
} from "../components/Common/Icons";
import UserFormModal from "../components/Admin/UserFormModal";
import UserDetailModal from "../components/Admin/UserDetailModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import AvatarModal from "../components/Admin/AvatarModal";
import Notification from "../components/Common/Notification";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")),
  );

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("userListData");
    return saved ? JSON.parse(saved) : [];
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  // const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [notify, setNotify] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem("userListData", JSON.stringify(users));
  }, [users]);

  const showNotification = (msg, type) => {
    setNotify({ show: true, msg, type });
    setTimeout(() => setNotify({ show: false, msg: "", type: "" }), 3000);
  };

  const handleUpdateAdminAvatar = (newLink) => {
    const updatedAdmin = { ...currentUser, avatar: newLink };
    setCurrentUser(updatedAdmin);
    localStorage.setItem("currentUser", JSON.stringify(updatedAdmin));

    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    localStorage.setItem(
      "userList",
      JSON.stringify(
        userList.map((u) =>
          u.username === currentUser.username ? { ...u, avatar: newLink } : u,
        ),
      ),
    );
    setIsAvatarModalOpen(false);
    showNotification("Cập nhật ảnh đại diện thành công!", "success");
  };

  const handleSaveUser = (data) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...data } : u)));
      showNotification("Cập nhật người dùng thành công!", "success");
    } else {
      const newUser = {
        ...data,
        id: Date.now(),
        updateDate: new Date().toLocaleDateString("vi-VN"),
      };
      setUsers([...users, newUser]);
      showNotification("Thêm người dùng mới thành công!", "success");
    }
    setIsFormModalOpen(false);
    setEditingUser(null);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== deletingId));
    setIsDeleteModalOpen(false);
    showNotification("Đã xóa người dùng!", "success");
  };

  if (!isLoggedIn) return null;

  return (
    <AdminLayout
      userName={currentUser?.username}
      onUpdateAvatar={() => setIsAvatarModalOpen(true)}
    >
      <Notification show={notify.show} msg={notify.msg} type={notify.type} />

      <div className="content-header">
        <h2>Quản lý người dùng</h2>
        <button
          className="add-btn btn-modal"
          onClick={() => {
            setEditingUser(null);
            setIsFormModalOpen(true);
          }}
        >
          <IconPlus /> Thêm
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Ngày cập nhật</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              users.map((item, index) => (
                <tr
                  className="action-btn view-btn"
                  onClick={() => {
                    setSelectedUser(item);
                    setIsDetailModalOpen(true);
                  }}
                  key={item.id ?? index}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.updateDate}</td>
                  <td
                    className={
                      item.status === "đã kích hoạt"
                        ? "status-active"
                        : "status-pending"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="action-btns">
                    <button
                      className="action-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingUser(item);
                        setIsFormModalOpen(true);
                      }}
                    >
                      <IconEdit />
                    </button>
                    <button
                      className="action-btn remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingId(item.id);
                        setIsDeleteModalOpen(true);
                      }}
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

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />

      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Bạn có chắc chắn muốn xóa người dùng này không?"
        danger
      />

      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleUpdateAdminAvatar}
        currentAvatar={currentUser?.avatar}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
