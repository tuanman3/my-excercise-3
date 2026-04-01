import React, { useState } from "react";
import { IconAlert } from "../Common/Icons";
import InputField from "../Common/InputField";

const UserFormModal = ({ isOpen, onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState({
    id: editingUser?.id || "",
    username: editingUser?.username || "",
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    phone: editingUser?.phone || "",
    avatar: editingUser?.avatar || "",
    status: editingUser?.status || "chưa kích hoạt",
  });

  // Chuyển sang dùng Object để lưu lỗi cho từng trường cho chuyên nghiệp
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Xóa lỗi của trường đó khi người dùng bắt đầu sửa
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSaveClick = () => {
    let newErrors = {};

    // Validate Email
    if (!formData.email?.trim()) {
      newErrors.email = "Email không được để trống!";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ!";
    }

    // Validate Tên
    if (!formData.name?.trim()) {
      newErrors.name = "Họ tên không được để trống!";
    }

    // Validate phone
    const validatePhone = (phone) => {
      return String(phone).match(/^(0[3|5|7|8|9])[0-9]{8}$/);
    };

    if (!formData.phone?.trim()) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Số điện thoại không hợp lệ (phải có 10 số, ví dụ: 09...)!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h3 style={{ marginBottom: "15px" }}>
          {editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        </h3>

        {/* Sử dụng InputField component thay cho code HTML cũ */}
        {editingUser && (
          <InputField
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            disabled={true}
            style={{ cursor: "not-allowed" }}
          />
        )}

        <InputField
          label="Tên đăng nhập (Username)"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          disabled={editingUser}
          style={{ cursor: "not-allowed" }}
          placeholder="Nhập tên đăng nhập..."
        />

        <InputField
          label="Họ tên"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="Nhập họ tên đầy đủ..."
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="example@s3.com"
        />

        <InputField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          placeholder="09xx xxx xxx"
        />

        <InputField
          label="Link ảnh đại diện"
          name="avatar"
          value={formData.avatar}
          onChange={handleInputChange}
          placeholder="https://..."
        />

        <div className="input-group">
          <label className="input-label">Trạng thái</label>
          <select
            name="status"
            className="input-field"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="đã kích hoạt">Đã kích hoạt</option>
            <option value="chưa kích hoạt">Chưa kích hoạt</option>
          </select>
        </div>

        {/* Hiển thị lỗi tổng quát nếu muốn (hoặc bỏ vì đã có lỗi từng ô) */}
        {Object.keys(errors).length > 0 && (
          <div
            className="error-summary"
            style={{ color: "#ff4d4f", fontSize: "13px", marginBottom: "10px" }}
          >
            <IconAlert /> Vui lòng kiểm tra lại thông tin.
          </div>
        )}

        <div className="modal-btns">
          <button className="btn-cancel btn-modal" onClick={onClose}>
            Hủy
          </button>
          <button
            className="btn-confirm btn-modal"
            onClick={handleSaveClick}
            style={{ background: "#9cdb7c", color: "#000", fontWeight: "bold" }}
          >
            Lưu dữ liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
