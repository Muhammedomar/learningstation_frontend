import React, { useState, useEffect } from "react";
export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "10px", color: "#555" }}>
      <h3>
        {time.toLocaleDateString()} • {time.toLocaleTimeString()}
      </h3>
    </div>
  );
}
