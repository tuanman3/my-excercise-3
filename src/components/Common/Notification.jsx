import { useEffect } from "react";
import "../../styles/Notification.css";
import { IconTick, IconX } from "./Icons";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Tự tắt sau 3 giây

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <span className="toast-message">
        {type === "success" ? <IconTick /> : <IconX />} {message}
      </span>
    </div>
  );
};

export default Notification;
