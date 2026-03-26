import { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Space, InputNumber } from "antd";

/**
 Modal Form Add / Edit for user.
 - id: read-only when edit, hidden when add (based on ms of date time)
 - Props: open, onClose, onSave, editingUser
**/
const UserFormModal = ({ open, onClose, onSave, editingUser }) => {
  const [form] = Form.useForm();
  const isEdit = !!editingUser;

  // Sync form data when editingUser changed
  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        isEdit
          ? {
              name: editingUser.name,
              email: editingUser.email,
              status: editingUser.status,
            }
          : { name: "", email: "", status: "chưa kích hoạt" },
      );
    }
  }, [open, editingUser, isEdit, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave(isEdit ? { ...values, id: editingUser.id } : values);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
      footer={null}
      centered
      width={480}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        style={{ marginTop: 16 }}
      >
        {/* ID just show when edit, read-only */}
        {isEdit && (
          <Form.Item label="ID">
            <InputNumber
              value={editingUser.id}
              disabled
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Tên hiển thị"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Select
            options={[
              { value: "đã kích hoạt", label: "Đã kích hoạt" },
              { value: "chưa kích hoạt", label: "Chưa kích hoạt" },
            ]}
          >
            {/* <Select.Option value="đã kích hoạt">Đã kích hoạt</Select.Option>
            <Select.Option value="chưa kích hoạt">Chưa kích hoạt</Select.Option> */}
          </Select>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" onClick={handleOk}>
              {isEdit ? "Lưu thay đổi" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
