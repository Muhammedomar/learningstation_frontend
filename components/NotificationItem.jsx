export default function NotificationItem({ note }) {
  return (
    <div className="card" style={{ marginBottom: 8 }}>
      <div>{note.title || "Notification"}</div>
      <div className="small">{note.message || note.content}</div>
    </div>
  );
}
