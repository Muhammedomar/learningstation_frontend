// // this is the permant code dont touch it
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// // Replace with your backend URL
// const SOCKET_URL = "http://localhost:5000";
// const socket = io(SOCKET_URL);

// export default function ChatWidget({ user, receiver }) {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [open, setOpen] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom on new message
//   const scrollToBottom = () =>
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   useEffect(() => {
//     socket.on("chat-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     });

//     return () => socket.off("chat-message");
//   }, []);

//   const handleSend = () => {
//     if (!text && !file) return;

//     const message = {
//       senderId: user.id,
//       senderName: user.name,
//       receiverId: receiver.id, // ✅ target
//       type: file ? "file" : "text",
//       text: text || "",
//     };

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         message.fileData = reader.result; // base64 string
//         message.fileName = file.name;
//         message.fileType = file.type;
//         socket.emit("chat-message", message);
//       };
//       reader.readAsDataURL(file);
//       setFile(null);
//     } else {
//       socket.emit("chat-message", message);
//     }

//     setText("");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) setFile(selectedFile);
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {/* Floating button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
//       >
//         💬
//       </button>

//       {open && (
//         <div className="w-80 h-96 bg-white border shadow-lg rounded-lg mt-2 flex flex-col">
//           {/* Header */}
//           <div className="p-2 border-b font-bold bg-gray-100 flex justify-between items-center">
//             Chat
//             <button onClick={() => setOpen(false)} className="text-gray-500">
//               ✖
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-2 space-y-1">
//             {messages.map((msg, i) => (
//               <div key={i} className="text-sm">
//                 <strong>{msg.senderName}:</strong>{" "}
//                 {msg.type === "file" && msg.fileUrl ? (
//                   msg.fileType && msg.fileType.startsWith("image/") ? (
//                     <img
//                       src={msg.fileUrl}
//                       alt={msg.fileName}
//                       className="max-h-40 rounded"
//                     />
//                   ) : (
//                     <a
//                       href={msg.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       download={msg.fileName}
//                       className="text-blue-600 underline"
//                     >
//                       📎 {msg.fileName}
//                     </a>
//                   )
//                 ) : (
//                   msg.text
//                 )}
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="flex p-2 border-t space-x-2">
//             <input
//               type="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 p-1 border rounded outline-none"
//             />
//             <input type="file" onChange={handleFileChange} />
//             <button
//               onClick={handleSend}
//               className="bg-blue-600 text-white px-3 rounded"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// new code
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://learningstation-kr6z.onrender.com/";
const socket = io(SOCKET_URL);

export default function ChatWidget({ user, receiver }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (user?.id) {
      socket.emit("join-user", user.id); // join personal room
    }

    socket.on("chat-message", (msg) => {
      // Only push if it belongs to this conversation
      if (
        (msg.senderId === user.id && msg.receiverId === receiver?.id) ||
        (msg.senderId === receiver?.id && msg.receiverId === user.id)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => socket.off("chat-message");
  }, [user, receiver]);

  const handleSend = () => {
    if (!text && !file) return;
    if (!receiver) {
      alert("Please select a user to chat with");
      return;
    }

    const message = {
      senderId: user.id,
      senderName: user.name,
      receiverId: receiver.id,
      receiverType: "user",
      type: file ? "file" : "text",
      text: text || "",
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        message.fileData = reader.result;
        message.fileName = file.name;
        message.fileType = file.type;
        socket.emit("chat-message", message);
      };
      reader.readAsDataURL(file);
      setFile(null);
    } else {
      socket.emit("chat-message", message);
    }

    setText("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="w-80 h-96 bg-white border shadow-lg rounded-lg mt-2 flex flex-col">
          {/* Header */}
          <div className="p-2 border-b font-bold bg-gray-100 flex justify-between items-center">
            {receiver ? `Chat with ${receiver.name}` : "Select a user"}
            <button onClick={() => setOpen(false)} className="text-gray-500">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${
                  msg.senderId === user.id ? "text-blue-600" : "text-gray-800"
                }`}
              >
                <strong>{msg.senderName}:</strong>{" "}
                {msg.type === "file" && msg.fileData ? (
                  msg.fileType && msg.fileType.startsWith("image/") ? (
                    <img
                      src={msg.fileData}
                      alt={msg.fileName}
                      className="max-h-40 rounded"
                    />
                  ) : (
                    <a
                      href={msg.fileData}
                      download={msg.fileName}
                      className="text-blue-600 underline"
                    >
                      📎 {msg.fileName}
                    </a>
                  )
                ) : (
                  msg.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-2 border-t space-x-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-1 border rounded outline-none"
            />
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
