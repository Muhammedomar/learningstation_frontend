import { useEffect, useState } from "react";
import { getMyMessages } from "../../api/messageApi";
import MessageItem from "../../components/MessageItem";

export default function Inbox() {
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    getMyMessages().then((r) => setMsgs(r));
  }, []);
  return (
    <div>
      <h2>Inbox</h2>
      {msgs.map((m) => (
        <MessageItem key={m._id} msg={m} />
      ))}
    </div>
  );
}
