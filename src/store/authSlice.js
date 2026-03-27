import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
    },
    updateAvatar: (state, action) => {
      if (state.currentUser) {
        const newAvatar = action.payload;
        state.currentUser = { ...state.currentUser, avatar: newAvatar };
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

        // ĐỌC VÀ GHI VÀO CÙNG MỘT KEY 'userList'
        const userList = JSON.parse(localStorage.getItem("userList")) || [];
        const updated = userList.map((u) =>
          u.username === state.currentUser.username
            ? { ...u, avatar: newAvatar }
            : u,
        );
        localStorage.setItem("userList", JSON.stringify(updated));
      }
    },
  },
});

export const { login, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
