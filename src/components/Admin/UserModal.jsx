import { useState } from "react";

const UserModal = ({ isOpen, onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState({
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    status: editingUser?.status || "chưa kích hoạt",
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="confirm-modal"
        style={{ width: "400px", textAlign: "left" }}
      >
        <h3>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h3>

        <div className="input-group">
          <label className="input-label">Tên hiển thị</label>
          <input
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            className="input-field"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label className="input-label">Trạng thái</label>
          <select
            className="input-field"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="đã kích hoạt">Đã kích hoạt</option>
            <option value="chưa kích hoạt">Chưa kích hoạt</option>
          </select>
        </div>

        <div className="modal-btns">
          <button className="btn-cancel btn-modal" onClick={onClose}>
            Hủy
          </button>
          <button
            className="btn-confirm btn-modal"
            onClick={() => onSave(formData)}
            style={{ backgroundColor: "#96e2b6", color: "#000" }}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
