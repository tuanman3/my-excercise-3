// src/pages/AdminProducts.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import { IconDelete, IconEdit } from "../components/Common/Icons";

const AdminProducts = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // check login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  // mock data
  const productsData = Array(5).fill({
    code: "PROD_001",
    name: "Tên sản phẩm mẫu",
    price: "100.000 đ",
    stock: "50",
  });

  return (
    <AdminLayout userName={currentUser?.username}>
      <div className="content-header">
        <h2>Danh sách sản phẩm</h2>
        <button className="add-btn">Thêm</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Kho</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((prod, index) => (
              <tr key={index}>
                <td>{prod.code}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td className="action-btns">
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
