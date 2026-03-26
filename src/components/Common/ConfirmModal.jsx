import { Modal, Button, Space } from "antd";

/**
 - general confirm modal (logout, delete,...)
 - Props: open, title, description, onConfirm, onCancel, confirmText, cancelText, danger
**/
const ConfirmModal = ({
  open,
  title = "Xác nhận",
  description,
  onConfirm,
  onCancel,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  danger = false,
}) => (
  <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    centered
    width={400}
    title={title}
  >
    {description && <p style={{ marginBottom: 24 }}>{description}</p>}
    <Space
      style={{ justifyContent: "flex-end", width: "100%", display: "flex" }}
    >
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button type="primary" danger={danger} onClick={onConfirm}>
        {confirmText}
      </Button>
    </Space>
  </Modal>
);

export default ConfirmModal;
