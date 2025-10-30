import React from "react";

export default function Navbar({ title, onLogout }) {
  return (
    <div className="header">
      <h3>{title}</h3>
      <div>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
