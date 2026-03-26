// src/components/Common/AppNotification.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { clearNotify } from "../../store/userSlice";

/**
 * Component listen Redux notify and show Ant Design notification toast
 * Put only 1 in AdminLayout.
 */
const Notification = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.users.notify);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (notify.show) {
      api[notify.type]({
        title: notify.msg,
        placement: "topRight",
        duration: 3,
      });
      dispatch(clearNotify());
    }
  }, [notify, api, dispatch]);

  return <>{contextHolder}</>;
};

export default Notification;
