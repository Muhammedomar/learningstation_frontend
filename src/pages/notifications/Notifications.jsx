export default function NotificationsPage() {
  const notes = [
    { id: 1, title: "Reminder", message: "Assignment due" },
    { id: 2, title: "Announcement", message: "Holiday" },
  ];
  return (
    <div>
      <h2>Notifications</h2>
      {notes.map((n) => (
        <div key={n.id} className="card">
          <b>{n.title}</b>
          <div className="small">{n.message}</div>
        </div>
      ))}
    </div>
  );
}
