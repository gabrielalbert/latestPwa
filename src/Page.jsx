import React, { useState, useEffect } from "react";
import './App.css';
import MainView from './component/mainView';
import NavBar from './component/navBar';
import SideBar from './component/sidebar';
import Footer from './component/footer';
import { BrowserRouter as Router,Route,Routes,Link, useLocation } from "react-router-dom";


function Pages({ aimodel,llmmodel, llm,llmkey,breadcrumb,headertext }) {
  const [active, setActive] = useState(aimodel);
  const [userName, setUserName] = useState("gabriel") ; 
  

  // useEffect(() => {
  //   window.location.reload()
  // }, [location.pathname])
  


  return (
    <div className="App">
      <NavBar />
      <div className='d-flex dashboardPage'>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <MainView active={active} llmmodel={llmmodel} llm={llm} llmkey={llmkey} breadcrumb={breadcrumb} headertext={headertext} username={userName} />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Pages;
