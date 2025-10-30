import React, { useState } from "react";
import {
  useCreateCourseMutation,
  useGetAllStudentsQuery,
  useGetAllTeachersQuery,
  useGetAllCoursesQuery,
  useAssignCourseToStudentMutation,
} from "../../api/adminApi";

const CreateCourse = () => {
  const [createCourse, { isLoading, isSuccess, isError, error }] =
    useCreateCourseMutation();
  const { data: teachers, isLoading: teacherLoading } =
    useGetAllTeachersQuery();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teacherId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse(formData);
    setFormData({ title: "", description: "", teacherId: "" });
  };

  if (teacherLoading) return <p>Loading teachers...</p>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-3 border rounded shadow"
      >
        <h2 className="text-xl font-bold">Create Course</h2>

        {isSuccess && (
          <p className="text-green-600">✅ Course created successfully!</p>
        )}
        {isError && <p className="text-red-600">{error?.data?.message}</p>}

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Teacher</option>
          {teachers?.teachers?.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Course"}
        </button>
      </form>
      <AllCourses />;
      <AssignCourse />
    </div>
  );
};

export const AllCourses = () => {
  const { data, isLoading, isError, error } = useGetAllCoursesQuery();
  console.log("all courses", data);

  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Error: {error?.data?.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">All Courses</h2>
      <ul className="space-y-3">
        {data?.courses?.length > 0 ? (
          data.courses.map((course) => (
            <li key={course._id} className="border p-3 rounded shadow">
              <p>
                <strong>{course.title}</strong>
              </p>
              <p>{course.description}</p>
              <p>Teacher name: {course.teacher?.name}</p>

              {/* ✅ Show total number of students */}
              <p>Students Enrolled: {course.students?.length || 0}</p>

              {/* ✅ Show student names (if any are enrolled) */}
              {course.students?.length > 0 && (
                <ul className="list-disc ml-6">
                  {course.students.map((student) => (
                    <li key={student._id}>Student name:{student.name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </ul>
    </div>
  );
};

export const AssignCourse = () => {
  const { data: students } = useGetAllStudentsQuery();
  const { data: courses } = useGetAllCoursesQuery();
  const [assignCourse, { isLoading, isSuccess, isError, error }] =
    useAssignCourseToStudentMutation();

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await assignCourse({ studentId, courseId });
    setStudentId("");
    setCourseId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-3 border rounded shadow"
    >
      <h2 className="text-xl font-bold">Assign Course to Student</h2>

      {isSuccess && <p className="text-green-600">✅ Assigned successfully!</p>}
      {isError && <p className="text-red-600">{error?.data?.message}</p>}

      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Select Student</option>
        {students?.students?.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>

      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Select Course</option>
        {courses?.courses?.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Assigning..." : "Assign"}
      </button>
    </form>
  );
};

export default CreateCourse;
