// import { useState } from "react";
// import { useGetMyCoursesQuery } from "../../api/teacherApi";
// import { useAddGoogleMeetLinkMutation } from "../../api/teacherApi";

// export default function ManageMeetLink() {
//   const { data: coursesData, isLoading } = useGetMyCoursesQuery();
//   const [updateMeetLink] = useAddGoogleMeetLinkMutation();
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [link, setLink] = useState("");

//   if (isLoading) return <p>Loading courses...</p>;

//   const handleCourseChange = (e) => {
//     const courseId = e.target.value;
//     setSelectedCourse(courseId);
//     const course = coursesData?.courses.find((c) => c._id === courseId);
//     setLink(course?.googleMeetLink || "");
//   };

//   const handleSave = async () => {
//     if (!selectedCourse || !link) {
//       alert("Select a course and enter the Meet link.");
//       return;
//     }
//     try {
//       await updateMeetLink({
//         courseId: selectedCourse,
//         googleMeetLink: link,
//       }).unwrap();
//       alert("✅ Meet link updated!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to update link");
//     }
//   };

//   return (
//     <div className="p-4 border rounded space-y-4">
//       <h2 className="text-xl font-bold">Manage Google Meet Link</h2>

//       <select value={selectedCourse} onChange={handleCourseChange}>
//         <option value="">Select a course</option>
//         {coursesData?.courses?.map((c) => (
//           <option key={c._id} value={c._id}>
//             {c.title}
//           </option>
//         ))}
//       </select>

//       {selectedCourse && (
//         <div className="space-y-2">
//           <input
//             type="text"
//             placeholder="Enter Google Meet link"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             className="border p-2 w-full"
//           />
//           <button
//             onClick={handleSave}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Save Link
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useGetMyCoursesQuery } from "../../api/teacherApi";
import { useAddGoogleMeetLinkMutation } from "../../api/teacherApi";

export default function ManageMeetLink() {
  const { data: coursesData, isLoading } = useGetMyCoursesQuery();
  const [updateMeetLink] = useAddGoogleMeetLinkMutation();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [link, setLink] = useState("");

  if (isLoading) return <p>Loading courses...</p>;

  // When course selection changes, update the link input
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    const course = coursesData?.courses.find((c) => c._id === courseId);
    setLink(course?.googleMeetLink || "");
  };

  // Save or update Meet link
  const handleSave = async () => {
    if (!selectedCourse || !link) {
      alert("Select a course and enter the Meet link.");
      return;
    }
    try {
      await updateMeetLink({
        courseId: selectedCourse,
        googleMeetLink: link,
      }).unwrap();
      alert("✅ Meet link updated!");
      // Optional: refresh the link from backend after save
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update link");
    }
  };

  return (
    <div className="p-4 border rounded space-y-4">
      <h2 className="text-xl font-bold">Manage Google Meet Link</h2>

      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select a course</option>
        {coursesData?.courses?.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>

      {selectedCourse && (
        <div className="space-y-2">
          {/* Show current saved link */}
          {link && (
            <div className="flex items-center justify-between">
              <span>Saved Link:</span>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Join Meet
              </a>
            </div>
          )}

          {/* Input to update link */}
          <input
            type="text"
            placeholder="Enter Google Meet link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Link
          </button>
        </div>
      )}
    </div>
  );
}
