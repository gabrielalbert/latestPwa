import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import "../index.css";
import CircleAvatar from "./circleAvatar";

const NavBar = ({ userName }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logIn = (e) => {
    console.log("lalallakskdjjdj");
    e.preventDefault();
    navigate("/log-in");
  };

  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;
  const displayName = parsedUser?.displayName;
  const roleName = parsedUser?.roleName;

  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid style={{ position: "static" }}>
        <Navbar.Brand>
          {" "}
          <div className="navbar-left">
            {/* <img src="/logo1.png" alt="Workshop" className='mdp-img' /> */}
            {/*<img src="/Appimage.png"></img>*/}
            <svg
              stroke="currentColor"
              fill="currentColor"
              className="mdp-img"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="40px"
              width="40px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                style={{ fill: "#284B9B" }}
                d="M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 0 1-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 0 1-1.5 0V13Z"
              ></path>
              <path
                style={{ fill: "#007bff" }}
                d="M8 19.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM5.25 9.5h13.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75Zm.22 1.47a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06 0L12 12.56l2.47 2.47a.75.75 0 0 0 1.06 0l3-3a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L15 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0L9 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0Z"
              ></path>
            </svg>
            <h2>NextGen AI Hub</h2>
          </div>
        </Navbar.Brand>

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>

        <p>{userName} </p>
        <div
          className="user-avatar status-online"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="36px"
            width="36px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"></path>
          </svg>
        </div>
        {isDrawerOpen && (
          <div
            style={{
              position: "fixed",
              top: "40px",
              right: "32px",
              width: "300px",
              background: "#fff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              borderRadius: "8px",
              zIndex: "1000",
            }}
          >
            <div class="user-details">
              <div class="user-avatar status-online">
                <CircleAvatar name={displayName} />
              </div>
              <div class="user-name">
                {displayName} <span style={{textAlign:'left'}}>{roleName}</span>
              </div>
            </div>

            {/* <div className="d-flex"> */}
            {/* <button
              onClick={() => navigate("/log-in")}
              style={{ width: "80%", marginTop: "5px",height:'40px', fontSize:'small',backgroundColor:'antiquewhite' }}
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/change-password")}
              style={{ width: "80%", marginTop: "5px",height:'40px', marginLeft:'2%', fontSize:'small', backgroundColor:'antiquewhite' }}
            >
              Change Password
            </button> */}
            <hr></hr>
            <ul class="user-menu-small-nav">
              
              <li onClick={() => navigate("/change-password")} style={{cursor: 'pointer', textAlign:'left'}}>
                <i>
                  <TbLockPassword />
                </i>
                Change Password
              </li>
              <li onClick={() => navigate("/log-in")} style={{cursor: 'pointer', textAlign:'left'}}>
                <i>
                  <AiOutlineLogout />
                </i>
                Logout
              </li>
            </ul>
            {/* </div> */}

          </div>
        )}        

        {/* {isDrawerOpen && (
          <div class="header-notifications-dropdown">
            <div class="user-status">
              <div class="user-details">
                <div class="user-avatar status-online">
                  <img src="/user-avatar-small-01.jpg" alt="" />
                </div>
                <div class="user-name">
                  {displayName} <span>{roleName}</span>
                </div>
              </div>
            </div>

            <div>
              <button onClick={logIn}>Logout</button>
            </div>
          </div>
        )} */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
