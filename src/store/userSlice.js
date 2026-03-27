import { createSlice } from "@reduxjs/toolkit";

// Dữ liệu mẫu khởi tạo (Mock data)
const initialUsers = [
  {
    id: 1,
    username: "man",
    name: "Tuấn Mẫn",
    email: "tuanman@s3.com",
    phone: "0901234567",
    status: "chưa kích hoạt",
    updateDate: "27/03/2026",
    password: "", // Để trống để Test trang Register (Kích hoạt)
  },
  {
    id: 2,
    username: "admin",
    name: "Quản Trị Viên",
    email: "admin@s3.com",
    phone: "0908888999",
    status: "đã kích hoạt",
    updateDate: "27/03/2026",
    password: "123", // Đã có pass để Test Login
  },
  {
    id: 3,
    username: "aaa",
    name: "Nguyễn Văn A",
    email: "vana@s3.com",
    phone: "0901112223",
    status: "chưa kích hoạt",
    updateDate: "27/03/2026",
    password: "",
  },
];

const loadUsers = () => {
  try {
    const saved = localStorage.getItem("userList");
    if (!saved) {
      // Nếu chưa có userList trong máy, lưu data mẫu vào luôn
      localStorage.setItem("userList", JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(saved);
  } catch {
    return initialUsers;
  }
};

const saveUsers = (users) => {
  localStorage.setItem("userList", JSON.stringify(users));
};

const nextId = (users) => {
  // if (!users || users.length === 0) return 1;
  // // Lấy ra tất cả id, lọc bỏ các giá trị không phải số, sau đó tìm Max
  // const ids = users.map((u) => Number(u.id)).filter((id) => !isNaN(id));
  // return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1;
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: loadUsers(),
    notify: { show: false, msg: "", type: "" },
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: nextId(state.list),
        updateDate: new Date().toLocaleDateString("vi-VN"),
        status: action.payload.status || "chưa kích hoạt",
        password: "", // Admin tạo thì chưa có pass
      };
      state.list.push(newUser);
      saveUsers(state.list);
      state.notify = {
        show: true,
        msg: "Thêm người dùng thành công!",
        type: "success",
      };
    },
    editUser: (state, action) => {
      const { id, ...data } = action.payload;
      state.list = state.list.map((u) =>
        u.id === id
          ? {
              ...u,
              ...data,
              updateDate: new Date().toLocaleDateString("vi-VN"),
            }
          : u,
      );
      saveUsers(state.list);
      state.notify = {
        show: true,
        msg: "Cập nhật thành công!",
        type: "success",
      };
    },
    removeUser: (state, action) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
      saveUsers(state.list);
      state.notify = { show: true, msg: "Đã xóa người dùng!", type: "error" };
    },
    toggleStatus: (state, action) => {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) {
        user.status =
          user.status === "đã kích hoạt" ? "chưa kích hoạt" : "đã kích hoạt";
        user.updateDate = new Date().toLocaleDateString("vi-VN");
        saveUsers(state.list);
      }
    },
    clearNotify: (state) => {
      state.notify = { show: false, msg: "", type: "" };
    },
  },
});

export const { addUser, editUser, removeUser, toggleStatus, clearNotify } =
  userSlice.actions;
export default userSlice.reducer;
