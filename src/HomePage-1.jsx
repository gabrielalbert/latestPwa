import React, { useState } from "react";
import './App.css';
import NavBar from './component/navBar';
import MainDashboard from "./component/mainDashboard";
import SideBar from './component/sidebar';
import Offerings from "./component/offerings";


function HomePages() {
  const [active, setActive] = useState("Dashboard")
  const [userName, setUserName] = useState("Gabriel")  
  return (
    <div>
      <NavBar userName={userName}/>
      <div className="dashboardPage">
      <div className='cont'>      
        <SideBar setActive={setActive} active={active} userName={userName} />
        <MainDashboard active={active}/>
      </div>
      <Offerings/>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePages;
