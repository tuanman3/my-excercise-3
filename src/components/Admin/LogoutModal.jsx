import "../../styles/Admin.css";

const LogoutModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h3>Xác nhận đăng xuất</h3>
        <p>Bạn có chắc chắn muốn rời khỏi hệ thống không?</p>
        <div className="modal-btns">
          <button className="btn-cancel btn-modal" onClick={onCancel}>
            Hủy bỏ
          </button>
          <button className="btn-confirm btn-modal" onClick={onConfirm}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
