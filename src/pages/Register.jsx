import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlert,
  IconAuthUser,
  IconEmail,
  IconLock,
  IconPhone,
  IconTick,
} from "../components/Common/Icons";
import DynamicForm from "../components/Form/DynamicForm";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const registerModel = [
    {
      name: "username",
      label: "Tên đăng nhập (Username)",
      placeholder: "Nhập username được cấp...",
      prefixIcon: <IconAuthUser />,
      rules: { required: true },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email đã đăng ký với Admin...",
      prefixIcon: <IconEmail />,
      rules: { required: true },
    },
    {
      name: "phone",
      label: "Số điện thoại",
      placeholder: "Số điện thoại đã đăng ký...",
      prefixIcon: <IconPhone />,
      rules: { required: true },
    },
    {
      name: "password",
      label: "Thiết lập mật khẩu mới",
      type: "password",
      placeholder: "Tối thiểu 6 ký tự",
      prefixIcon: <IconLock />,
      rules: { required: true, minLength: 6 },
    },
  ];

  const handleRegisterLogic = (data) => {
    setError("");

    // get user list
    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    // tìm user match
    const userIndex = userList.findIndex(
      (u) =>
        u.username === data.username &&
        u.email === data.email &&
        u.phone === data.phone,
    );

    if (userIndex === -1) {
      setError("Thông tin không khớp với dữ liệu nhân viên hệ thống!");
      return;
    }

    if (userList[userIndex].password && userList[userIndex].password !== "") {
      setError("Tài khoản này đã được kích hoạt trước đó!");
      return;
    }

    // update password
    const updatedUserList = [...userList];
    updatedUserList[userIndex] = {
      ...updatedUserList[userIndex],
      password: data.password,
      status: "đã kích hoạt",
      updateDate: new Date().toLocaleDateString("vi-VN"),
    };

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
            <span className="alert-icon">
              <IconAlert />
            </span>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">
              <IconTick />
            </span>
            Kích hoạt thành công! Đang chuyển hướng...
          </div>
        )}

        <DynamicForm
          formModel={registerModel}
          buttonText="Kích hoạt ngay"
          onSubmit={handleRegisterLogic}
          customButtonClass="login-submit-btn"
        />

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
