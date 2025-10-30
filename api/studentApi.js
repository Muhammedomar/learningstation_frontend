// src/api/studentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learningstation-kr6z.onrender.com/api/students",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // get token from redux
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Courses", "Assignments", "Attendance"],
  endpoints: (builder) => ({
    getMyCourses: builder.query({
      query: () => "/my-courses",
      providesTags: ["Courses"],
    }),
    getCourseMaterials: builder.query({
      query: (courseId) => `/course/${courseId}/materials`,
    }),
    getCourseMeetLink: builder.query({
      query: (courseId) => `/course/${courseId}/meet-link`,
    }),
    getCourseAssignments: builder.query({
      query: (courseId) => `/${courseId}/assignments`,
      providesTags: ["Assignments"],
    }),
    // submitAssignment: builder.mutation({
    //   query: ({ assignmentId, body }) => ({
    //     url: `/assignments/${assignmentId}/submit`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Assignments"],
    // }),
    //--------------------------------------------
    submitAssignment: builder.mutation({
      query: ({ assignmentId, answerText, file }) => {
        const formData = new FormData();
        formData.append("answerText", answerText || "");
        if (file) formData.append("file", file); // must match upload.single("file")

        return {
          url: `/assignments/${assignmentId}/submit`,
          method: "POST",
          body: formData,
          // Do NOT set Content-Type manually — browser sets it
        };
      },
      invalidatesTags: ["Assignments"],
    }),

    //-------------------------------------------------
    getMySubmission: builder.query({
      query: (assignmentId) => `/assignments/${assignmentId}/my-submission`,
    }),
    getAttendance: builder.query({
      query: (courseId) => `/attendance/${courseId}`,
      providesTags: ["Attendance"],
    }),
    getAttendanceStats: builder.query({
      query: (courseId) => `/attendance-stats/${courseId}`,
    }),
  }),
});

export const {
  useGetMyCoursesQuery,
  useGetCourseMaterialsQuery,
  useGetCourseMeetLinkQuery,
  useGetCourseAssignmentsQuery,
  useSubmitAssignmentMutation,
  useGetMySubmissionQuery,
  useGetAttendanceQuery,
  useGetAttendanceStatsQuery,
} = studentApi;
