import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAuthUser,
  IconEmail,
  IconLock,
  IconPhone,
} from "../components/Common/Icons";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự!");
      return;
    }

    // get user list
    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    // fint user match with Username, Email and Phone
    const userIndex = userList.findIndex(
      (u) =>
        u.username === formData.username &&
        u.email === formData.email &&
        u.phone === formData.phone,
    );

    // chech conditions activate
    if (userIndex === -1) {
      setError("Thông tin không khớp với dữ liệu nhân viên hệ thống!");
      return;
    }

    if (userList[userIndex].password && userList[userIndex].password !== "") {
      setError("Tài khoản này đã được kích hoạt trước đó!");
      return;
    }

    // update password and activate account
    const updatedUserList = [...userList];
    updatedUserList[userIndex] = {
      ...updatedUserList[userIndex],
      password: formData.password, // Cập nhật mật khẩu mới
      status: "đã kích hoạt", // Đổi trạng thái
      updateDate: new Date().toLocaleDateString("vi-VN"),
    };

    // Save on LocalStorage
    localStorage.setItem("userList", JSON.stringify(updatedUserList));

    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: "440px" }}>
        <div className="login-header">
          <h2>Kích Hoạt Tài Khoản</h2>
          <p className="subtitle">Dành cho nhân viên đã có trên hệ thống</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠</span> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span> Kích hoạt thành công! Đang
            chuyển hướng...
          </div>
        )}

        <form onSubmit={handleRegister} className="login-form">
          {/* Tên đăng nhập */}
          <div className="form-group">
            <label>Tên đăng nhập (Username)</label>
            <div className="input-wrapper">
              <span className="prefix-icon">
                <IconAuthUser />
              </span>
              <input
                type="text"
                name="username"
                required
                placeholder="Nhập username được cấp..."
                className="login-input"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="prefix-icon">
                <IconEmail />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email đã đăng ký với Admin..."
                className="login-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Số điện thoại</label>
            <div className="input-wrapper">
              <span className="prefix-icon">
                <IconPhone />
              </span>
              <input
                type="text"
                name="phone"
                required
                placeholder="Số điện thoại đã đăng ký..."
                className="login-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label>Thiết lập mật khẩu mới</label>
            <div className="input-wrapper">
              <span className="prefix-icon">
                <IconLock />
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="Tối thiểu 6 ký tự"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Kích hoạt ngay
          </button>
        </form>

        <div className="login-footer">
          <span>Đã kích hoạt? </span>
          <button className="link-btn" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
