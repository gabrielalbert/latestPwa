import React, { useState } from "react";
import "../App.css";
function NavBar({userName}) {    
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          {/* <img src="/logo1.png" alt="Workshop" className='mdp-img' /> */}
          <svg stroke="currentColor" fill="currentColor"  className='mdp-img' strokeWidth="0" viewBox="0 0 24 24" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg">
  <path style={{fill: '#284B9B'}} d="M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 0 1-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 0 1-1.5 0V13Z"></path>
  <path style={{fill: '#007bff'}} d="M8 19.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM5.25 9.5h13.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75Zm.22 1.47a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06 0L12 12.56l2.47 2.47a.75.75 0 0 0 1.06 0l3-3a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L15 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0L9 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0Z"></path>
</svg>
          <h2>Prompt Buddy</h2>          
        </div>
        <div className="navbar-right">
        <p>{userName} </p>          
          <div className="user-avatar status-online">            
          <svg  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="36px" width="36px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"></path></svg>       
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
