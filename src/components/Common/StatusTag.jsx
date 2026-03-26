import { Tag } from "antd";

/**
 - show status user as Ant Design Tag.
 - reusable at table and detail modal.
**/
const StatusTag = ({ status }) => {
  const activated = status === "đã kích hoạt";
  return (
    <Tag color={activated ? "success" : "warning"}>
      {activated ? "Đã kích hoạt" : "Chưa kích hoạt"}
    </Tag>
  );
};

export default StatusTag;
