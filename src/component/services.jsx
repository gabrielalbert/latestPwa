import React, { useState } from "react";
import { FaCopy } from "react-icons/fa6";
// import "./OurServices.css"; // For styling
import NavBar from "../component/navBar";
import SideBar from "../component/sidebar";
import { MdOutlineCompareArrows } from "react-icons/md";
import "../index.css";

const OurServices = () => {
  const [active, setActive] = useState("Offerings");
  const [userName, setUserName] = useState("Gabriel");

  const cards = Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    title: "Chat",
    description: "Code conversion",
  }));

  return (
    <div className="App">
      <NavBar userName={userName} />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="services-container">
          <h1 className="header">Our Services</h1>
          <div className="card-container">
            {cards.map((card) => (
              <div className="card" key={card.id}>
                {/* <i className="icon-material-outline-file-copy"></i> */}
                <MdOutlineCompareArrows className="copy-icon" title="Copy" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
