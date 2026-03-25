import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/Form/DynamicForm";
import Notification from "../components/Common/Notification";

import "../styles/Auth.css";
import { useState } from "react";

const Register = () => {
  const [notify, setNotify] = useState({ show: false, msg: "", type: "" });

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
    // Get old user from localStorage (if not then create empty array)
    const existingUsers = JSON.parse(localStorage.getItem("userList")) || [];

    // Check email or username already yet
    const isExisted = existingUsers.some(
      (user) => user.username === data.username,
    );
    if (isExisted) {
      setNotify({
        show: true,
        msg: "Tên đăng nhập đã tồn tại!",
        type: "warning",
      });

      return;
    }

    // Add new user into array
    const updatedUsers = [...existingUsers, data];

    // Save new array into localStorage
    localStorage.setItem("userList", JSON.stringify(updatedUsers));
    setNotify({ show: true, msg: "Đăng ký thành công!", type: "success" });

    setTimeout(() => navigate("/login"), 500);
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
