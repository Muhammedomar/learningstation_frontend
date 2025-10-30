export default function MessageItem({ msg }) {
  return (
    <div className="card" style={{ marginBottom: 8 }}>
      <div>
        <b>{msg.sender?.name || "Someone"}</b>
      </div>
      <div className="small">{msg.content}</div>
    </div>
  );
}
