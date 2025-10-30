// src/redux/api/adminApi.js (or inside your existing apiSlice)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://learningstation-kr6z.onrender.com/api";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/admin`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Adjust based on where you store token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => "/all-students",
    }),
    getAllTeachers: builder.query({
      query: () => "/all-teachers",
    }),
    // Add more admin-related endpoints as needed
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/create-course",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Courses"], // refetch courses after creation
    }),
    getAllCourses: builder.query({
      query: () => "/all-courses",
      providesTags: ["Courses"], // cache + auto-refetch when invalidated
    }),
    getCourseById: builder.query({
      query: (courseId) => `/courses/${courseId}`,
      providesTags: (result, error, courseId) => [
        { type: "Courses", id: courseId },
      ],
    }),

    assignCourseToStudent: builder.mutation({
      query: (data) => ({
        url: "/assign-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"], // refetch after assigning
    }),
    getAttendanceReport: builder.query({
      query: () => "/reports/attendance",
    }),
    //admin assgment
    getAllAssignmentsReport: builder.query({
      query: () => "/admin/assignments-report", // adjust route if different
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetCourseByIdQuery,
  useGetAllTeachersQuery,
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useAssignCourseToStudentMutation,
  useGetAttendanceReportQuery,
  useGetAllAssignmentsReportQuery,
} = adminApi;
