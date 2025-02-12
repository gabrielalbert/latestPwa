import React, { useState, useEffect } from "react";
import './App.css';
import Pages from "./Page";
import HomePages from "./HomePage";
import OurServices from "./component/services";
import Login from "./component/login";
import Signup from "./component/signup";
import UserListPage from "./component/userList";
import CreateUser from "./component/createUser";
import ChangePassword from "./component/changePassword";
import Aws from "./component/aws";
import DeleteRepoPage from "./component/DeleteRepoPage";
import AddRepoPage from "./component/AddRepoPage";
import { BrowserRouter as Router,Route,Routes, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Apps() { 

  const location = useLocation()

  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    try {
    const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData).userId > 0 : false;
    } catch (error) {
      console.error("Error reading localStorage:", error)
      return false
    }
  })
  // const userId = JSON.parse(localStorage.getItem('user') || '{}');
  // console.log(userId.userId,'iaiaiiaiia')
  // console.log(userId && parseInt(userId.userId),'parseInt(userId.userId)===')


  useEffect(() => {
    const userData = localStorage.getItem("user"); 
    console.log(userData,'userData-=-=-')
    if(userData){
      const userId = JSON.parse(userData).userId;
      console.log(userId,'uaiiaiaiiaia')
      if(userId > 0 && !isAuthenticated){
        setIsAuthenticated(true);
      }
    }
  }, [])

  console.log(isAuthenticated,'isAuthenticated-=-=-=')

  

  
  return (
    <div className="App overflow-auto">
    {/* <Router> */}
    <div>
      <Routes key={location.pathname} location={location}>
       <Route path="" element={<HomePages />}></Route>
       <Route path="/copilot" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Copilot-o1 mini"/> : <Navigate to="/log-in" />}></Route>
       <Route path="/copilot-preview" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Copilot-o1 Preview"/> : <Navigate to="/log-in" />}></Route>
       <Route path="/gemini-ai" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Gemini AI" /> : <Navigate to="/log-in" />}></Route>
       <Route path="/open-ai-gpt" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Open AI-GPT"/> : <Navigate to="/log-in" />}></Route>

       <Route path="/code-llama" element={isAuthenticated ? <Pages key={location.pathname} aimodel="CodeLlama/CodeLlama-34B-Instruct-hf"/> : <Navigate to="/log-in" />}></Route>
       <Route path="/microsoft-phi" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Microsoft/Phi-3.5-mini-Instruct"/> : <Navigate to="/log-in" />}></Route>
       <Route path="/mistral-nemo" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Mistralai/Mistral-nemo-Instruct-2407"/> : <Navigate to="/log-in" />}></Route>
       <Route path="/nousresearch-hermes" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Nousresearch/Hermes-3-Llama-3.1-8B"/> : <Navigate to="/log-in" />}></Route>

       <Route path="/aws-bedrock" element={isAuthenticated ? <Aws aimodel="AWS BedRock"/> : <Navigate to="/log-in" />} ></Route>
       <Route path="/services" element={isAuthenticated ? <OurServices/> : <Navigate to="/log-in" />}></Route>
       <Route path="/log-in" element={<Login/>}></Route>
       <Route path="/sign-up" element={isAuthenticated ? <Signup/> : <Navigate to="/log-in" />}></Route>
       <Route path="/user-list" element={isAuthenticated ? <UserListPage/> : <Navigate to="/log-in" />}></Route>
       <Route path="/create-user" element={isAuthenticated ? <CreateUser/> : <Navigate to="/log-in" />}></Route>
       <Route path="/change-password" element={ <ChangePassword/> }></Route>
       <Route path="/deleterepo" element={isAuthenticated ? <DeleteRepoPage/> : <Navigate to="/log-in" />}></Route>
       <Route path="/addrepo" element={isAuthenticated ?<AddRepoPage/> : <Navigate to="/log-in" />}></Route>
      </Routes>
    </div>
  {/* </Router> */}
  </div>
  
  );
}

export default function App(){
  return(
    <Router>
      <Apps />
    </Router>
  )
};
