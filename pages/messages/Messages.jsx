import { useEffect, useState } from "react";
import { getMyMessages, sendMessage } from "../../api/messageApi";
import MessageItem from "../../components/MessageItem";

export default function Messages() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    getMyMessages().then((r) => setMsgs(r));
  }, []);
  const onSend = async () => {
    if (!text) return;
    await sendMessage({ receiverId: "t1", content: text });
    setMsgs((prev) => [
      { _id: "tmp" + Date.now(), sender: { name: "You" }, content: text },
      ...prev,
    ]);
    setText("");
  };
  return (
    <div>
      <h2>Messages</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          style={{ width: "80%", padding: 8 }}
        />
        <button className="btn" onClick={onSend} style={{ marginLeft: 8 }}>
          Send
        </button>
      </div>
      {msgs.map((m) => (
        <MessageItem key={m._id} msg={m} />
      ))}
    </div>
  );
}
