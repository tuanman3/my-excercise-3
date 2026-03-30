/**
 - general confirm modal (logout, delete,...)
 - Props: open, title, description, onConfirm, onCancel, confirmText, cancelText, danger
**/
const ConfirmModal = ({
  isOpen,
  title = "Xác nhận",
  description,
  onConfirm,
  onCancel,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  danger = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>

        <div className="modal-body">
          {description && (
            <p style={{ color: "#666", lineHeight: "1.5" }}>{description}</p>
          )}
        </div>

        <div className="modal-btns">
          <button className="btn-cancel btn-modal" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            className={`btn-confirm btn-modal ${danger ? "btn-danger" : ""}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
