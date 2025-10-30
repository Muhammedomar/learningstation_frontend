import { useParams } from "react-router-dom";
import { useGetCourseDetailsQuery } from "../../api/studentApi";

export default function CourseDetails() {
  const { courseId } = useParams();
  const { data, error, isLoading } = useGetCourseDetailsQuery(courseId);

  if (isLoading) return <p>Loading course details...</p>;
  if (error) return <p>Error fetching course</p>;

  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.description}</p>
      <p>Teacher: {data?.teacher?.name}</p>
    </div>
  );
}
