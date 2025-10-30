export default function CourseCard({ course }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <h4>{course.title}</h4>
      <div className="small">
        Teacher: {course.teacher?.name || course.teacher}
      </div>
      {course.googleMeetLink && (
        <div style={{ marginTop: 6 }}>
          <a href={course.googleMeetLink} target="_blank">
            Join Meet
          </a>
        </div>
      )}
    </div>
  );
}
