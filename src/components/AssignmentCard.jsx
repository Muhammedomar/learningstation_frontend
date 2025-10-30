export default function AssignmentCard({ assignment }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <h4>{assignment.title}</h4>
      <div className="small">Due: {assignment.dueDate}</div>
    </div>
  );
}
