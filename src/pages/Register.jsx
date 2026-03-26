// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (values) => {
    setError("");
    const existingUsers = JSON.parse(localStorage.getItem("userList")) || [];

    if (existingUsers.some((u) => u.username === values.username)) {
      setError("Tên đăng nhập đã tồn tại!");
      return;
    }

    localStorage.setItem(
      "userList",
      JSON.stringify([...existingUsers, values]),
    );
    setSuccess(true);
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#D9D9D9",
        padding: 16,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 12,
          boxShadow: "0 2px 4px #000",
          border: "2px solid #DCD7C9",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0 }}>
            Đăng Ký
          </Title>
          <Text type="secondary">Tạo tài khoản quản trị mới</Text>
        </div>

        {error && (
          <Alert
            title={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        {success && (
          <Alert
            title="Đăng ký thành công! Đang chuyển hướng..."
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên!" },
              {
                pattern: /^[a-zA-Z0-9 ]+$/,
                message: "Không được chứa ký tự đặc biệt!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên của bạn..."
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập SĐT!" },
              {
                pattern: /^[0-9]{10,}$/,
                message: "SĐT phải là số, từ 10 chữ số trở lên!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="09xxxxxxxx" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit" block>
              Đăng ký ngay
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text type="secondary">Đã có tài khoản? </Text>
          <Button
            type="link"
            onClick={() => navigate("/login")}
            style={{ padding: 0 }}
          >
            Đăng nhập
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
