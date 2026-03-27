// src/components/Common/Notification.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotify } from "../../store/userSlice";

const Notification = () => {
  const dispatch = useDispatch();
  // Lấy trực tiếp notify từ store
  const notify = useSelector((state) => state.users.notify);

  useEffect(() => {
    // Nếu thông báo đang hiện, thiết lập thời gian tự đóng
    if (notify.show) {
      const timer = setTimeout(() => {
        dispatch(clearNotify());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notify.show, dispatch]);

  // Render trực tiếp dựa trên state của Redux
  if (!notify.show || !notify.msg) return null;

  return (
    <div className={`toast-notification ${notify.type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {notify.type === "success" ? "✓" : "⚠"}
        </span>
        <span className="toast-msg">{notify.msg}</span>
      </div>
      <button className="toast-close" onClick={() => dispatch(clearNotify())}>
        ×
      </button>
    </div>
  );
};

export default Notification;
