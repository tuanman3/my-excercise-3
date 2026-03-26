import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../store/authSlice";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    setError("");

    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const foundUser = userList.find(
      (u) => u.username === values.username && u.password === values.password,
    );

    if (!foundUser) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      setLoading(false);
      return;
    }
    setSuccess("Đăng nhập thành công!");
    dispatch(login(foundUser));
    setTimeout(() => navigate("/admin/dashboard"), 300);
    setLoading(false);
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
          maxWidth: 400,
          borderRadius: 12,
          boxShadow: "0 2px 4px #000",
          border: "2px solid #DCD7C9",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0 }}>
            Đăng Nhập
          </Title>
          <Text type="secondary">Hệ thống quản trị Admin</Text>
        </div>

        {success && (
          <Alert
            title={success}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {error && (
          <Alert
            title={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đã đăng ký..." />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text type="secondary">Chưa có tài khoản? </Text>
          <Button
            type="link"
            onClick={() => navigate("/register")}
            style={{ padding: 0 }}
          >
            Đăng ký ngay
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
