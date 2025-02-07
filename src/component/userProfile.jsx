import React from "react";

const UserProfilePopup = () => {
  // Mocked username
  const userName = "Hi Gabriel";
  // Handle logout (add your logout logic here)
  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here
  };
  return (
    <div>
      {userName}
      {/* <div style={popupStyle}>
         <div style={usernameStyle}>{userName}</div>
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button> 
      </div> */}
    </div>
  );
};
// Styling for the popup
const popupStyle = {
  position: "fixed",
  top: "50px", // Adjust according to your needs
  right: "20px", // Adjust according to your needs
  padding: "10px",
  backgroundColor: "white",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  zIndex: 1000,
  width:"15%",
  height: "22%"

};
// Styling for the username text
const usernameStyle = {
  marginBottom: "10px",
  fontWeight: "bold",
  textAlign:"left"
};
// Styling for the logout button
const logoutButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width:"30%",
  height:"35%"
};
export default UserProfilePopup;
