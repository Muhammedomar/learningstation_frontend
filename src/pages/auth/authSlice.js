// frontend/pages/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("mgh_token");
const storedUser = localStorage.getItem("mgh_user");

let parsedUser = null;
try {
  if (storedUser && storedUser !== "undefined") {
    parsedUser = JSON.parse(storedUser);
  }
} catch (e) {
  console.error("Failed to parse stored user:", e);
  parsedUser = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedToken || null,
    user: parsedUser,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      localStorage.setItem("mgh_token", token);
      localStorage.setItem("mgh_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("mgh_token");
      localStorage.removeItem("mgh_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
