// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
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

    // Logic kiểm tra pattern (thay thế rules của AntD)
    if (!/^[a-zA-Z0-9 ]+$/.test(formData.username)) {
      setError("Tên đăng nhập không được chứa ký tự đặc biệt!");
      return;
    }
    if (!/^[0-9]{10,}$/.test(formData.phone)) {
      setError("SĐT phải là số, từ 10 chữ số trở lên!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("userList")) || [];

    if (existingUsers.some((u) => u.username === formData.username)) {
      setError("Tên đăng nhập đã tồn tại!");
      return;
    }

    localStorage.setItem(
      "userList",
      JSON.stringify([...existingUsers, formData]),
    );
    setSuccess(true);
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: "440px" }}>
        <div className="login-header">
          <h2>Đăng Ký</h2>
          <p className="subtitle">Tạo tài khoản quản trị mới</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠</span> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span> Đăng ký thành công! Đang
            chuyển hướng...
          </div>
        )}

        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <div className="input-wrapper">
              <span className="prefix-icon">
                <IconAuthUser />
              </span>
              <input
                type="text"
                name="username"
                required
                placeholder="Nhập tên của bạn..."
                className="login-input"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

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
                placeholder="example@gmail.com"
                className="login-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

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
                placeholder="09xxxxxxxx"
                className="login-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <div className="input-wrapper">
              <span className="prefix-icon">
                <IconLock />
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="********"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Đăng ký ngay
          </button>
        </form>

        <div className="login-footer">
          <span>Đã có tài khoản? </span>
          <button className="link-btn" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
