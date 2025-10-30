// frontend/src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authReducer from "./pages/auth/authSlice";
import { studentApi } from "./api/studentApi";
import { teacherApi } from "./api/teacherApi";
import { adminApi } from "./api/adminApi"; // ✅ import this
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer, // ✅ add this
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(studentApi.middleware)
      .concat(teacherApi.middleware)
      .concat(adminApi.middleware), // ✅ add this
});

export default store;
