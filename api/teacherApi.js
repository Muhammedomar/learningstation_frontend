// src/api/teacherApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learningstation-kr6z.onrender.com/api/teachers",
    prepareHeaders: (headers, { getState }) => {
      let token = getState().auth?.token;

      // ✅ fallback to localStorage if Redux doesn't have token
      if (!token) {
        token = localStorage.getItem("token");
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Courses", "Assignments", "Attendance"],
  endpoints: (builder) => ({
    getMyCourses: builder.query({
      query: () => "/my-courses",
      providesTags: ["Courses"],
    }),
    addCourseMaterial: builder.mutation({
      query: (body) => ({
        url: "/add-material",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),
    markAttendance: builder.mutation({
      query: (body) => ({
        url: "/mark-attendance",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),
    addGoogleMeetLink: builder.mutation({
      query: (body) => ({
        url: "/add-meet-link",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),
    createAssignment: builder.mutation({
      query: (body) => ({
        url: "/create-assignment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assignments"],
    }),
    getCourseAssignments: builder.query({
      query: (courseId) => `/${courseId}/assignments`,
      providesTags: ["Assignments"],
    }),
    viewSubmissions: builder.query({
      query: (assignmentId) => `/assignments/${assignmentId}/submissions`,
    }),
    gradeSubmission: builder.mutation({
      query: ({ assignmentId, submissionId, body }) => ({
        url: `/assignments/${assignmentId}/submissions/${submissionId}/grade`,
        method: "PUT",
        body,
      }),
    }),
    getCourseAttendance: builder.query({
      query: (courseId) => `/attendance/${courseId}`,
      providesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetMyCoursesQuery,
  useAddCourseMaterialMutation,
  useMarkAttendanceMutation,
  useAddGoogleMeetLinkMutation,
  useCreateAssignmentMutation,
  useGetCourseAssignmentsQuery,
  useViewSubmissionsQuery,
  useGradeSubmissionMutation,
  useGetCourseAttendanceQuery,
} = teacherApi;
