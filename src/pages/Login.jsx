import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/Form/DynamicForm";
import "../styles/Auth.css";

const Login = () => {
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
      alert("Tài khoản chưa tồn tại. Vui lòng đăng ký!");
      return;
    }

    // Kiểm tra thông tin khớp hoàn toàn với lúc đăng ký
    if (
      data.username === savedUser.username &&
      data.password === savedUser.password
    ) {
      alert(`Chào mừng ${savedUser.username} đã quay trở lại!`);
      // Ở đây bạn có thể navigate('/home') nếu đã có trang chủ
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="auth-container">
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
