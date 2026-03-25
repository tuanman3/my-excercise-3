import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/Form/DynamicForm";
import "../styles/Auth.css";
import Notification from "../components/Common/Notification";
import { useState } from "react";

const Login = () => {
  const [notify, setNotify] = useState({ show: false, msg: "", type: "" });
  const navigate = useNavigate();

  const loginModel = [
    {
      label: "Tên đăng nhập",
      name: "username",
      placeholder: "Tên đã đăng ký...",
      rules: { required: true },
    },
    {
      label: "Mật khẩu",
      name: "password",
      type: "password",
      placeholder: "********",
      rules: { required: true },
    },
  ];

  const handleLogin = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("userAccount"));

    if (!savedUser) {
      setNotify({
        show: true,
        msg: "Tài khoản chưa tồn tại. Vui lòng đăng ký!",
        type: "error",
      });
      return;
    }

    // Check for match user's information
    if (
      savedUser &&
      data.username === savedUser.username &&
      data.password === savedUser.password
    ) {
      // session
      localStorage.setItem("isLoggedIn", "true");

      setNotify({ show: true, msg: "Đăng nhập thành công!", type: "success" });
      setTimeout(() => navigate("/admin/dashboard"), 500);
    } else {
      setNotify({
        show: true,
        msg: "Tên đăng nhập hoặc mật khẩu không đúng.",
        type: "error",
      });
    }
  };

  return (
    <div className="auth-container">
      {notify.show && (
        <div className="toast-container">
          <Notification
            message={notify.msg}
            type={notify.type}
            onClose={() => setNotify({ ...notify, show: false })}
          />
        </div>
      )}
      <div className="auth-card">
        <h2 className="auth-title">Đăng Nhập</h2>

        <DynamicForm
          formModel={loginModel}
          onSubmit={handleLogin}
          buttonText="Đăng nhập"
        />

        <div className="auth-footer">
          <span>Chưa có tài khoản? </span>
          <button onClick={() => navigate("/register")} className="auth-link">
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
