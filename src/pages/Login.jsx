import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
// Giữ lại icon nếu bạn vẫn dùng @ant-design/icons,
// hoặc thay bằng icon SVG/FontAwesome tương ứng
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/Main.css";
import { IconAuthUser, IconLock } from "../components/Common/Icons";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Thay thế onFinish của AntD
    setLoading(true);
    setError("");

    // Giữ nguyên logic check LocalStorage của bạn
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const foundUser = userList.find(
      (u) =>
        u.username === formData.username && u.password === formData.password,
    );

    if (!foundUser) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      setLoading(false);
      return;
    }

    setSuccess("Đăng nhập thành công!");
    dispatch(login(foundUser));

    setTimeout(() => {
      navigate("/admin/dashboard");
      setLoading(false);
    }, 300);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Đăng Nhập</h2>
          <p className="subtitle">Hệ thống quản trị Admin</p>
        </div>

        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span> {success}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
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
                placeholder="Tên đã đăng ký..."
                value={formData.username}
                onChange={handleChange}
                className="login-input"
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
                value={formData.password}
                onChange={handleChange}
                className="login-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`login-submit-btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="login-footer">
          <span>Chưa có tài khoản? </span>
          <button className="link-btn" onClick={() => navigate("/register")}>
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
