import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import { IconDelete, IconEdit, IconPlus } from "../components/Common/Icons";
import UserFormModal from "../components/Admin/UserFormModal";
import UserDetailModal from "../components/Admin/UserDetailModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import AvatarModal from "../components/Admin/AvatarModal";
import Notification from "../components/Common/Notification";
import SearchHeader from "../components/Common/SearchHeader";
import { Button, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import UserFilterPanel from "../components/Admin/UserFilterPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")),
  );

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("userList");
    return saved ? JSON.parse(saved) : [];
  });

  // Định nghĩa các trường dữ liệu cần filter
  const initialFilterState = {
    searchKeyword: "",
    name: "",
    email: "",
    phone: "",
    status: null,
  };
  const [filters, setFilters] = useState(initialFilterState);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);

  // Dùng để lưu thông tin user và trạng thái muốn chuyển tới
  const [statusTarget, setStatusTarget] = useState({
    user: null,
    newStatus: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [notify, setNotify] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(users));
  }, [users]);

  // --- LOGIC FILTER DATA ---
  const filteredData = useMemo(() => {
    return users.filter((user) => {
      // 1. Search tổng quát (Tên, Email, SĐT) - Dùng searchKeyword
      const keyword = filters.searchKeyword?.trim().toLowerCase() || "";
      const matchesSearch =
        !keyword ||
        user.name?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword) ||
        user.phone?.includes(keyword);

      // 2. Filter chi tiết (Panel Filter) - Dùng trim() để tránh khoảng trắng thừa
      const fName = filters.name?.trim().toLowerCase() || "";
      const fEmail = filters.email?.trim().toLowerCase() || "";
      const fPhone = filters.phone?.trim() || "";
      const fStatus = filters.status;

      const matchesName = !fName || user.name?.toLowerCase().includes(fName);
      const matchesEmail =
        !fEmail || user.email?.toLowerCase().includes(fEmail);
      const matchesPhone = !fPhone || user.phone?.includes(fPhone);
      const matchesStatus = !fStatus || user.status === fStatus;

      return (
        matchesSearch &&
        matchesName &&
        matchesEmail &&
        matchesPhone &&
        matchesStatus
      );
    });
  }, [users, filters]);

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
      // Logic Sửa: Giữ nguyên ID, cập nhật các field và updateDate
      const updatedUsers = users.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              ...data,
              updateDate: new Date().toLocaleDateString("vi-VN"),
            }
          : u,
      );
      setUsers(updatedUsers);
      showNotification("Cập nhật người dùng thành công!", "success");
    } else {
      // ID auto asc
      const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;

      const newUser = {
        id: maxId + 1,
        username: data.username, // Phải có username để sau này Signup
        name: data.name,
        email: data.email,
        phone: data.phone, // Thêm số điện thoại theo yêu cầu
        status: data.status || "chưa kích hoạt",
        updateDate: new Date().toLocaleDateString("vi-VN"),
        password: "", // Mặc định trống, sẽ được tạo khi Signup
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

  // Hàm xử lý khi click vào Checkbox/Dòng trạng thái ---
  const handleRequestStatusChange = (user) => {
    // Xác định trạng thái ngược lại
    const nextStatus =
      user.status === "đã kích hoạt" ? "chưa kích hoạt" : "đã kích hoạt";

    // Lưu user mục tiêu và trạng thái mới vào state
    setStatusTarget({ user: user, newStatus: nextStatus });

    // Mở Modal xác nhận (Modal 1 hoặc Modal 2 trong hình)
    setIsStatusConfirmOpen(true);
  };

  // --- START: Hàm thực hiện thay đổi trạng thái sau khi xác nhận ---
  const confirmStatusChange = () => {
    const { user, newStatus } = statusTarget;
    if (!user) return;

    // Cập nhật State Users (giữ nguyên logic gốc của Tuấn Mẫn)
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            status: newStatus,
            updateDate: new Date().toLocaleDateString("vi-VN"),
          }
        : u,
    );
    setUsers(updatedUsers);

    // Đóng Modal và reset target
    setIsStatusConfirmOpen(false);
    setStatusTarget({ user: null, newStatus: "" });

    // Hiển thị thông báo
    const msg =
      newStatus === "đã kích hoạt"
        ? "Đã kích hoạt tài khoản!"
        : "Đã hủy kích hoạt tài khoản!";
    showNotification(msg, "success");
  };

  // --- Các hàm handle mới cho Filter ---
  const handleClearFilters = () => {
    setFilters(initialFilterState); // Reset về trạng thái trống ban đầu
    showNotification("Đã xóa toàn bộ bộ lọc!", "success");
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  if (!isLoggedIn) return null;

  // Xác định text cho Modal dựa trên trạng thái muốn chuyển tới
  const isActivating = statusTarget.newStatus === "đã kích hoạt";
  const confirmModalText = isActivating
    ? `Kích hoạt tài khoản "${statusTarget.user?.name || "some text"}"?` // Hình 1
    : `Hủy kích hoạt tài khoản "${statusTarget.user?.name || "some text"}"?`; // Hình 2

  return (
    <AdminLayout
      userName={currentUser?.username}
      onUpdateAvatar={() => setIsAvatarModalOpen(true)}
    >
      <Notification show={notify.show} msg={notify.msg} type={notify.type} />

      <div className="content-header">
        <h2>Quản lý người dùng</h2>

        <div className="header-actions">
          <SearchHeader
            onSearch={(val) =>
              setFilters((prev) => ({
                ...prev,
                searchKeyword: val,
              }))
            }
          />
          <div className="actions-panel">
            <button
              className="add-btn btn-modal"
              onClick={() => {
                setEditingUser(null);
                setIsFormModalOpen(true);
              }}
              style={{ height: "33px" }}
            >
              <IconPlus /> <span>Thêm</span>
            </button>

            <Tooltip
              title={isFilterPanelOpen ? "Đóng bộ lọc" : "Mở bộ lọc nâng cao"}
            >
              <Button
                type="primary"
                icon={<FilterOutlined />}
                size="large"
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                style={{
                  backgroundColor: isFilterPanelOpen ? "#d9d9d9" : "#faad14",
                  borderColor: isFilterPanelOpen ? "#d9d9d9" : "#faad14",
                  color: isFilterPanelOpen ? "#666" : "#fff",
                }}
                className="filter-toggle-btn"
              ></Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Open/close component filter panel */}

      {isFilterPanelOpen && (
        <UserFilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          onCollapse={toggleFilterPanel}
          isCollapsed={false}
        />
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Ngày cập nhật</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="action-btn view-btn"
                  onClick={() => {
                    setSelectedUser(item);
                    setIsDetailModalOpen(true);
                  }}
                >
                  <td title={item.name}>{item.name}</td>
                  <td title={item.email}>{item.email}</td>
                  <td>{item.updateDate}</td>
                  <td
                    className="status-cell"
                    onClick={(e) => {
                      e.stopPropagation(); // Chặn detail modal
                      handleRequestStatusChange(item); // Mở Confirm Modal
                    }}
                  >
                    <div className="status-checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="status-checkbox"
                        // Logic checked: Dựa hoàn toàn vào dữ liệu cứng "đã kích hoạt"
                        checked={item.status === "đã kích hoạt"}
                        // Cực kỳ quan trọng: onChange trống để input không tự đổi
                        onChange={() => {}}
                      />
                      <span
                        className={`status-text ${item.status === "đã kích hoạt" ? "active" : "pending"}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="action-btns"
                  >
                    <button
                      className="action-btn edit-btn"
                      onClick={() => {
                        setEditingUser(item);
                        setIsFormModalOpen(true);
                      }}
                    >
                      <IconEdit />
                    </button>
                    <button
                      className="action-btn remove-btn"
                      onClick={() => {
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

      <ConfirmModal
        isOpen={isStatusConfirmOpen}
        onCancel={() => {
          setIsStatusConfirmOpen(false);
          setStatusTarget({ user: null, newStatus: "" }); // Reset target
        }}
        onConfirm={confirmStatusChange}
        title={confirmModalText}
        confirmText={isActivating ? "Kích hoạt" : "Hủy kích hoạt"}
        cancelText="Đóng"
        danger={!isActivating}
      />

      <UserFormModal
        // Khi editingUser đổi từ id:1 sang id:2, React sẽ xóa Modal cũ và tạo mới hoàn toàn
        // giúp state bên trong tự động được reset mà không cần useEffect
        key={editingUser?.id || "new-user"}
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
        title={`Bạn muốn xóa tài khoản "${users.find((u) => u.id === deletingId)?.name || "some text"}"?`}
        confirmText="Xoá"
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
