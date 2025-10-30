// frontend/api/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learningstation-kr6z.onrender.com/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (newUser) => {
        console.log(newUser);
        return { url: "/auth/register", method: "POST", body: newUser };
      },
    }),
  }),
});

// export hooks
export const { useLoginMutation, useRegisterMutation } = authApi;
