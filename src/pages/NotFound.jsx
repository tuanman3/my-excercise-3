import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <h1 className="notfound-code">404</h1>

        <h2 className="notfound-title">Trang không tồn tại</h2>

        <p className="notfound-desc">
          Rất tiếc, chúng tôi không thể tìm thấy trang mà bạn đang yêu cầu. Vui
          lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>

        <button onClick={() => navigate("/login")} className="notfound-btn">
          Quay lại Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default NotFound;
