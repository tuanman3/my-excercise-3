import React from "react";

const UserDetailModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal" style={{ width: "400px" }}>
        <h3>Thông tin chi tiết</h3>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.username || "A"}&background=random`
            }
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt=""
          />
        </div>
        <div className="detail-item" style={{ marginBottom: "10px" }}>
          <strong>Họ tên:</strong> <span>{user.name}</span>
        </div>
        <div className="detail-item" style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="detail-item" style={{ marginBottom: "10px" }}>
          <strong>Ngày tạo:</strong> <span>{user.updateDate}</span>
        </div>
        <div className="detail-item">
          <strong>Trạng thái:</strong> <span>{user.status}</span>
        </div>
        <div className="modal-btns" style={{ marginTop: "20px" }}>
          <button className="btn-confirm btn-modal" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
