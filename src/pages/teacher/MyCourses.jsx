import React from "react";
import { useGetMyCoursesQuery } from "../../api/teacherApi";

export default function TeacherCourses() {
  const { data, isLoading, isError } = useGetMyCoursesQuery();
  console.log("TeacherCourses data", data);
  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Error fetching courses</p>;

  return (
    <div>
      <h2>My Courses</h2>
      {data?.courses?.length > 0 ? (
        <ul>
          {data.courses.map((course) => (
            <li key={course._id}>
              <b>{course.title}</b> - Students: {course.students?.length || 0}
              {course.students.map((s) => s.name).join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses assigned</p>
      )}
    </div>
  );
}
