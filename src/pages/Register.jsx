import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/Form/DynamicForm";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const registerModel = [
    {
      label: "Tên",
      name: "username",
      placeholder: "Nhập tên của bạn...",
      rules: {
        required: true,
        pattern: /^[a-zA-Z0-9 ]+$/,
        message: "Tên không được chứa ký tự đặc biệt",
      },
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
      rules: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
        message: "Email không hợp lệ",
      },
    },
    {
      label: "Số điện thoại",
      name: "phone",
      placeholder: "09xxxxxxxx",
      rules: {
        required: true,
        pattern: /^[0-9]+$/,
        minLength: 10,
        message: "SĐT phải là số và từ 10 chữ số trở lên",
      },
    },
    {
      label: "Mật khẩu",
      name: "password",
      type: "password",
      placeholder: "********",
      rules: {
        required: true,
        minLength: 6,
        message: "Mật khẩu tối thiểu 6 ký tự",
      },
    },
  ];

  const handleRegister = (data) => {
    // Lưu thông tin vào localStorage để trang Login có thể dùng
    localStorage.setItem("userAccount", JSON.stringify(data));
    alert("Đăng ký thành công!");
    navigate("/login"); // Chuyển sang trang đăng nhập ngay
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng Ký</h2>

        <DynamicForm
          formModel={registerModel}
          onSubmit={handleRegister}
          buttonText="Đăng ký ngay"
        />

        <div className="auth-footer">
          <span>Đã có tài khoản? </span>
          <button onClick={() => navigate("/login")} className="auth-link">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
