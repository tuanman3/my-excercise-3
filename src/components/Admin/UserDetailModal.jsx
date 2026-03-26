import { Modal, Descriptions, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import StatusTag from "../Common/StatusTag";

/**
 * Modal read user's info — READ ONLY
 * show when click on row in table.
 * Props: open, onClose, user
 */
const UserDetailModal = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Thông tin người dùng"
      footer={null}
      centered
      width={480}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Avatar
          size={80}
          icon={<UserOutlined />}
          src={user.avatar}
          style={{ backgroundColor: "#1677ff" }}
        />
      </div>

      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Tên hiển thị">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <StatusTag status={user.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {user.updateDate}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserDetailModal;
