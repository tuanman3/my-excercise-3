import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Rất tiếc, trang bạn truy cập không tồn tại."
        extra={
          <Button type="primary" onClick={() => navigate("/login")}>
            Quay lại đăng nhập
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
