// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Space, Tooltip, Typography } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import AdminLayout from "../components/Admin/AdminLayout";
import UserFormModal from "../components/Admin/UserFormModal";
import UserDetailModal from "../components/Admin/UserDetailModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import StatusTag from "../components/Common/StatusTag";
import { addUser, editUser, removeUser } from "../store/userSlice";

const { Title } = Typography;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  // Modal states
  const [formOpen, setFormOpen] = useState(false); // Add/Edit form
  const [detailOpen, setDetailOpen] = useState(false); // View detail (read-only)
  const [deleteOpen, setDeleteOpen] = useState(false); // Confirm delete

  const [editingUser, setEditingUser] = useState(null); // user was editing
  const [selectedUser, setSelectedUser] = useState(null); // user was reading or deleting

  // ── Handlers ──
  const handleSave = (data) => {
    if (editingUser) {
      dispatch(editUser({ ...data, id: editingUser.id }));
    } else {
      dispatch(addUser(data));
    }
    setFormOpen(false);
    setEditingUser(null);
  };

  const handleEdit = (user, e) => {
    e.stopPropagation(); // not trigger row click
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleDeleteClick = (user, e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeUser(selectedUser.id));
    setDeleteOpen(false);
    setSelectedUser(null);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  // ── Table columns ──
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      responsive: ["md"],
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      responsive: ["sm"],
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
      key: "updateDate",
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusTag status={status} />,
      responsive: ["sm"],
    },
    {
      title: "",
      key: "actions",
      width: 90,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "#52c41a" }} />}
              onClick={(e) => handleEdit(record, e)}
            />
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
              onClick={(e) => handleDeleteClick(record, e)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // ── Render ──
  return (
    <AdminLayout>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Danh sách người dùng
        </Title>

        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUser(null);
            setFormOpen(true);
          }}
          style={{
            background: "#DCD7C9",
            fontWeight: "700",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#DCD7C9";
            e.currentTarget.style.backgroundColor = "#DCD7C9";

            e.currentTarget.style.boxShadow = "inset 0 2px 4px #3F4E4F";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Thêm
        </Button>
      </div>

      {/* Table — click row → view detail */}
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        pagination={{ pageSize: 8, showSizeChanger: false }}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
        })}
        locale={{ emptyText: "Chưa có dữ liệu" }}
      />

      {/* Add / Edit Form Modal */}
      <UserFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSave}
        editingUser={editingUser}
      />

      {/* View Detail Modal (read-only) */}
      <UserDetailModal
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={deleteOpen}
        title="Xoá người dùng"
        description={`Bạn có chắc muốn xoá "${selectedUser?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xoá"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
