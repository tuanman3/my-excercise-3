import { useEffect } from "react";
import "../../styles/Notification.css";
import { IconTick, IconX } from "./Icons";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3s
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
