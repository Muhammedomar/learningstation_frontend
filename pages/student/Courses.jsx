import React from "react";
// import ChatWidget from "../../components/ChatWidget";
import {
  useGetMyCoursesQuery,
  useGetCourseMeetLinkQuery,
} from "../../api/studentApi";
import { useNavigate } from "react-router-dom";

export default function MyCourses({ user }) {
  const { data, isLoading, isError } = useGetMyCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Failed to fetch courses</p>;

  // Nested component to fetch meet link for each course
  const CourseItem = ({ course }) => {
    const { data: meetData, isLoading: linkLoading } =
      useGetCourseMeetLinkQuery(course._id);
    console.log("meetData", meetData);
    return (
      <li key={course._id} className="mb-4 border p-3 rounded">
        <b>{course.title}</b> - Teacher: {course.teacher?.name}
        <div className="mt-2 space-x-2">
          <button
            onClick={() => navigate(`/student/assignments/${course._id}`)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            View Assignments
          </button>

          {linkLoading ? (
            <span className="text-gray-500">Loading link...</span>
          ) : meetData?.course?.googleMeetLink ? (
            <a
              href={meetData.course.googleMeetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Join Class
            </a>
          ) : (
            <span className="text-gray-500">No link yet</span>
          )}
        </div>
        {/* <ChatWidget user={user} courseId={course._id} /> */}
      </li>
    );
  };

  return (
    <div>
      <h2>My Courses</h2>
      {data?.courses?.length > 0 ? (
        <ul>
          {data.courses.map((course) => (
            <CourseItem key={course._id} course={course} />
          ))}
        </ul>
      ) : (
        <p>No courses enrolled</p>
      )}
    </div>
  );
}
