import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Button, Modal, Tag } from "antd";

import AdminLayout from "../components/Admin/AdminLayout";
import UserFormModal from "../components/Admin/UserFormModal";
import UserDetailModal from "../components/Admin/UserDetailModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import AvatarModal from "../components/Admin/AvatarModal";
import Notification from "../components/Common/Notification";
import SearchHeader from "../components/Common/SearchHeader";
import { IconDelete, IconEdit, IconPlus } from "../components/Common/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  editUser,
  removeUser,
  toggleStatus,
} from "../store/userSlice";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")),
  );

  const users = useSelector((state) => state.users.list);

  // State manament Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);

  // Search & Filter State
  const [searchText, setSearchText] = useState("");

  const [statusTarget, setStatusTarget] = useState({
    user: null,
    newStatus: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(users));
  }, [users]);

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
  };

  const handleSaveUser = (data) => {
    if (editingUser) {
      dispatch(editUser({ ...data, id: editingUser.id }));
    } else {
      dispatch(addUser(data));
    }
    setIsFormModalOpen(false);
    setEditingUser(null);
  };

  const confirmDelete = () => {
    dispatch(removeUser(deletingId));
    setIsDeleteModalOpen(false);
  };

  const handleRequestStatusChange = (user) => {
    const nextStatus =
      user.status === "đã kích hoạt" ? "chưa kích hoạt" : "đã kích hoạt";
    setStatusTarget({ user, newStatus: nextStatus });
    setIsStatusConfirmOpen(true);
  };

  const confirmStatusChange = () => {
    if (statusTarget.user) {
      dispatch(toggleStatus(statusTarget.user.id));
    }
    setIsStatusConfirmOpen(false);
    setStatusTarget({ user: null, newStatus: "" });
  };

  // --- LOGIC SEARCH DATA ---
  const filteredData = useMemo(() => {
    const lowerSearch = searchText.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(lowerSearch) ||
        u.email?.toLowerCase().includes(lowerSearch) ||
        u.phone?.includes(lowerSearch) ||
        u.username?.toLowerCase().includes(lowerSearch),
    );
  }, [users, searchText]);

  // --- ANT DESIGN TABLE COLUMNS ---
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <span
          onClick={() => {
            setSelectedUser(record);
            setIsDetailModalOpen(true);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      filters: [
        { text: "@s3.com", value: "@s3.com" },
        { text: "@mail.com", value: "@mail.com" },
      ],
      onFilter: (value, record) =>
        record.email?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
      key: "updateDate",
      responsive: ["md"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã kích hoạt", value: "đã kích hoạt" },
        { text: "Chưa kích hoạt", value: "chưa kích hoạt" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, record) => (
        <div
          className="status-checkbox-wrapper"
          onClick={(e) => {
            e.stopPropagation();
            handleRequestStatusChange(record);
          }}
          style={{ cursor: "pointer" }}
        >
          <input
            type="checkbox"
            className="status-checkbox"
            checked={status === "đã kích hoạt"}
            readOnly
          />
          <span
            className={`status-text ${status === "đã kích hoạt" ? "active" : "pending"}`}
          >
            {status}
          </span>
        </div>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space
          size="middle"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            type="text"
            icon={<IconEdit />}
            onClick={(e) => {
              e.stopPropagation();
              setEditingUser(record);
              setIsFormModalOpen(true);
            }}
          />
          <Button
            type="text"
            danger
            icon={<IconDelete />}
            onClick={(e) => {
              e.stopPropagation();
              setDeletingId(record.id);
              setIsDeleteModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const isActivating = statusTarget.newStatus === "đã kích hoạt";
  const confirmModalText = isActivating
    ? `Kích hoạt tài khoản "${statusTarget.user?.name || "some text"}"?`
    : `Hủy kích hoạt tài khoản "${statusTarget.user?.name || "some text"}"?`;

  return (
    <AdminLayout
      userName={currentUser?.username}
      onUpdateAvatar={() => setIsAvatarModalOpen(true)}
    >
      <Notification />

      <div className="content-header" style={{ marginBottom: 20 }}>
        <h2>Quản lý người dùng</h2>
        <Space size="large">
          <SearchHeader onSearch={(val) => setSearchText(val)} />
          <Button
            type="primary"
            icon={<IconPlus />}
            size="medium"
            onClick={() => {
              setEditingUser(null);
              setIsFormModalOpen(true);
            }}
            className="add-btn btn-modal"
          >
            Thêm
          </Button>
        </Space>
      </div>

      <div className="admin-table-container">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          locale={{
            filterConfirm: "Ok",
            filterReset: "Reset",
            emptyText: "No data",
          }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedUser(record);
              setIsDetailModalOpen(true);
            },
            className: "antd-row-hover",
          })}
        />
      </div>

      <ConfirmModal
        isOpen={isStatusConfirmOpen}
        onCancel={() => {
          setIsStatusConfirmOpen(false);
          setStatusTarget({ user: null, newStatus: "" });
        }}
        onConfirm={confirmStatusChange}
        title={confirmModalText}
        confirmText={isActivating ? "Kích hoạt" : "Hủy kích hoạt"}
        cancelText="Đóng"
        danger={!isActivating}
      />

      <UserFormModal
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
