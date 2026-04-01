import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

import "../styles/Main.css";
import {
  IconAlert,
  IconAuthUser,
  IconLock,
  IconTick,
} from "../components/Common/Icons";
import DynamicForm from "../components/Form/DynamicForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Cấu hình form
  const loginModel = [
    {
      name: "username",
      label: "Tên đăng nhập",
      placeholder: "Tên đã đăng ký...",
      prefixIcon: <IconAuthUser />,
      rules: { required: true },
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      placeholder: "********",
      prefixIcon: <IconLock />,
      rules: { required: true },
    },
  ];

  const handleLoginLogic = (data) => {
    setLoading(true);
    setError("");

    // Giả lập độ trễ để thấy loading state
    setTimeout(() => {
      const userList = JSON.parse(localStorage.getItem("userList")) || [];
      const foundUser = userList.find(
        (u) => u.username === data.username && u.password === data.password,
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
    }, 500);
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
            <span className="alert-icon">
              <IconTick />
            </span>
            {success}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">
              <IconAlert />
            </span>
            {error}
          </div>
        )}

        {/* DynamicForm */}
        <DynamicForm
          formModel={loginModel}
          onSubmit={handleLoginLogic}
          buttonText={loading ? "Đang xử lý..." : "Đăng nhập"}
          // Thêm class để giữ đúng style của bạn
          customButtonClass={`login-submit-btn ${loading ? "loading" : ""}`}
          disabled={loading}
        />

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
