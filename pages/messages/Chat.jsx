import { useState } from "react";
export default function Chat() {
  const [text, setText] = useState("");
  const onSend = () => {
    alert("Would send: " + text);
    setText("");
  };
  return (
    <div>
      <h2>Chat</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "70%", padding: 8 }}
          placeholder="message"
        />
        <button className="btn" onClick={onSend} style={{ marginLeft: 8 }}>
          Send
        </button>
      </div>
      <div>(chat area — dummy)</div>
    </div>
  );
}
