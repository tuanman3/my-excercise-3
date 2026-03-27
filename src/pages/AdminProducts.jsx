import { useState } from "react";
import AdminLayout from "../components/Admin/AdminLayout";
import { IconDelete, IconEdit, IconPlus } from "../components/Common/Icons";

const AdminProducts = () => {
  const [products] = useState([
    {
      id: 1,
      code: "PROD_001",
      name: "Sản phẩm mẫu 1",
      price: "100.000 đ",
      stock: 50,
    },
    {
      id: 2,
      code: "PROD_002",
      name: "Sản phẩm mẫu 2",
      price: "250.000 đ",
      stock: 5,
    },
  ]);

  return (
    <AdminLayout>
      <div className="content-header">
        <h2>Danh sách sản phẩm</h2>
        <button className="add-btn btn-modal">
          <IconPlus /> Thêm
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Kho</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: "600" }}>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <span
                    className={`tag ${p.stock > 10 ? "tag-green" : "tag-red"}`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td
                  className="action-btns"
                  style={{ justifyContent: "flex-end" }}
                >
                  <button className="action-btn edit-btn">
                    <IconEdit />
                  </button>
                  <button className="action-btn remove-btn">
                    <IconDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
