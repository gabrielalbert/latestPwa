import React from "react";
import "../App.css";
export default function CircleAvatar({ name }) {
  // Function to extract initials
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.trim().split(" ");
    return nameParts.length > 1
      ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
      : nameParts[0][0].toUpperCase();
  };

  return <div className="circle-avatar">{getInitials(name)}</div>;
}