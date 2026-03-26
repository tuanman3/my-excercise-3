import { Table, Button, Typography, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AdminLayout from "../components/Admin/AdminLayout";

const { Title } = Typography;

// Mock data — replace it with Redux slices when a real API is available
const mockProducts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  code: `PROD_00${i + 1}`,
  name: "Tên sản phẩm mẫu",
  price: "100.000 đ",
  stock: 50 - i * 5,
}));

const columns = [
  { title: "Mã SP", dataIndex: "code", key: "code", responsive: ["md"] },
  { title: "Tên sản phẩm", dataIndex: "name", key: "name", ellipsis: true },
  { title: "Giá", dataIndex: "price", key: "price", responsive: ["sm"] },
  {
    title: "Kho",
    dataIndex: "stock",
    key: "stock",
    responsive: ["sm"],
    render: (v) => <Tag color={v > 10 ? "green" : "red"}>{v}</Tag>,
  },
  {
    title: "",
    key: "actions",
    width: 90,
    render: () => (
      <Space size="small">
        <Button
          type="text"
          icon={<EditOutlined style={{ color: "#52c41a" }} />}
        />
        <Button
          type="text"
          icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
        />
      </Space>
    ),
  },
];

const AdminProducts = () => (
  <AdminLayout>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        Danh sách sản phẩm
      </Title>
      <Button
        icon={<PlusOutlined />}
        style={{
          background: "#DCD7C9",
          fontWeight: "700",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#DCD7C9";
          e.currentTarget.style.backgroundColor = "#DCD7C9";
          e.currentTarget.style.boxShadow = "inset 0 2px 4px #3F4E4F";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Thêm
      </Button>
    </div>

    <Table
      rowKey="id"
      dataSource={mockProducts}
      columns={columns}
      pagination={{ pageSize: 8, showSizeChanger: false }}
      scroll={{ x: "max-content" }}
      locale={{ emptyText: "Chưa có dữ liệu" }}
    />
  </AdminLayout>
);

export default AdminProducts;
