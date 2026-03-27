import React, { useState } from "react";

const UserFormModal = ({ isOpen, onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState({
    username: editingUser?.username || "",
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    phone: editingUser?.phone || "",
    avatar: editingUser?.avatar || "",
    status: editingUser?.status || "chưa kích hoạt",
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="confirm-modal"
        style={{ width: "450px", textAlign: "left" }}
      >
        <h3>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h3>

        {/* Trường Username - Cực kỳ quan trọng để Signup */}
        <div className="input-group">
          <label className="input-label">Tên đăng nhập (Username)</label>
          <input
            name="username"
            className="input-field"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            disabled={!!editingUser} // Thường username không nên cho sửa sau khi tạo
          />
        </div>

        <div className="input-group">
          <label className="input-label">Họ tên</label>
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
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label className="input-label">Số điện thoại</label>
          <input
            name="phone"
            className="input-field"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label className="input-label">Link ảnh đại diện</label>
          <input
            className="input-field"
            value={formData.avatar}
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
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
            style={{ background: "#9cdb7c", color: "#000" }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
