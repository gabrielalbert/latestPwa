import React, { useState } from "react";
import "../SideNavbar.css"; // Assuming you will style it in an external CSS file
import { GoCopilot } from "react-icons/go";
import { RiRobot3Line } from "react-icons/ri";
import { GrDashboard } from "react-icons/gr";
import { Link } from "react-router-dom";

const SideNavbar = ({active, setActive}) => {

  const handleItemClick =(item)=>{
    console.log(item,'jskjksjkjhdbvf')
    setActive(item)    
  }

  return (
    <div className="side-navbar">
      <nav>
        
      <ul data-submenu-title="Home" className="list-group">
          <li className={active === "Dashboard" ? "active" : "navigation"} onClick={() => handleItemClick("Dashboard")}><Link to= "/" className={active === "Dashboard" ? "active" : "navigation"} onClick={() => handleItemClick("Dashboard")} ><GrDashboard />&nbsp; Dashboard</Link></li>          
        </ul>
        <ul data-submenu-title="AI Model 1">
          <li className={active === "GitHub Copilot" ? "active" : "navigation"} onClick={() => handleItemClick("GitHub Copilot")}><Link to ="/copilot" className={active === "GitHub Copilot" ? "active" : "navigation"} onClick={() => handleItemClick("GitHub Copilot")} ><GoCopilot />&nbsp; GitHub Copilot</Link></li>
          <li className={active === "Gemini AI" ? "active" : "navigation"} onClick={() => handleItemClick("Gemini AI")}><Link to ="/gemini-ai" className={active === "Gemini AI" ? "active" : "navigation"} onClick={() => handleItemClick("Gemini AI")} ><RiRobot3Line />&nbsp;  Gemini AI</Link></li>
          {/* <li className={active === "Chat GPT" ? "active" : ""} onClick={() => handleItemClick("Chat GPT")}><MdOutlineDashboard /><a href="/chat-gpt" className={active === "Chat GPT" ? "active" : "navigation"} onClick={() => handleItemClick("Chat GPT")}>Chat GPT</a></li> */}
        </ul>
      </nav>
    </div>
  );
};
export default SideNavbar;
