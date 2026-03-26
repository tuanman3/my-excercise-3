// src/components/Admin/AvatarModal.jsx
import { useState } from "react";
import { Modal, Input, Form, Button, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

/**
 * Modal đổi avatar admin — nhập URL ảnh.
 * Props: open, onClose, currentAvatar, onSave
 *
 * Không dùng useEffect hay destroyOnClose.
 * AdminLayout truyền key={avatarOpen} để React tự unmount/remount
 * component mỗi khi modal mở — useState sẽ tự init lại đúng giá trị.
 */
const AvatarModal = ({ open, onClose, currentAvatar, onSave }) => {
  const [link, setLink] = useState(currentAvatar || "");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Cập nhật ảnh đại diện"
      footer={null}
      centered
      width={400}
    >
      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <Avatar
          size={80}
          src={link || undefined}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#dbcda6" }}
        />
      </div>

      <Form layout="vertical">
        <Form.Item label="Dán Link ảnh mới (URL)">
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" onClick={() => onSave(link)}>
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AvatarModal;
