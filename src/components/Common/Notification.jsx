import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotify } from "../../store/userSlice";
import { IconAlert, IconTick } from "./Icons";
import "../../styles/Notification.css";
const Notification = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.users.notify);

  useEffect(() => {
    if (notify.show) {
      const timer = setTimeout(() => {
        dispatch(clearNotify());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notify.show, dispatch]);

  if (!notify.show || !notify.msg) return null;

  return (
    <div className={`toast-notification ${notify.type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {notify.type === "success" ? <IconTick /> : <IconAlert />}
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
