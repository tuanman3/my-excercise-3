import { createSlice } from "@reduxjs/toolkit";

const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("userListData")) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem("userListData", JSON.stringify(users));
};

// Auto-increment id: lấy max id hiện có + 1
const nextId = (users) =>
  users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1;

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
        id: nextId(state.list), // auto-increment, not change
        updateDate: new Date().toLocaleDateString("vi-VN"),
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
              id,
              updateDate: new Date().toLocaleDateString("vi-VN"),
            } // giữ nguyên id
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
      state.notify = { show: true, msg: "Đã xoá người dùng!", type: "error" };
    },
    clearNotify: (state) => {
      state.notify = { show: false, msg: "", type: "" };
    },
  },
});

export const { addUser, editUser, removeUser, clearNotify } = userSlice.actions;
export default userSlice.reducer;
