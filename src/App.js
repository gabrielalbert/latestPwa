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
import UnitTest from "./component/Unittest";
import CodeConversion from "./component/codeConversion";
import LayoutDesign from "./component/layoutDesign";
import VideoToKTPage from "./component/VideoToKTPage";
import MainViewCLI from "./component/mainView_CLI1";
import Repository from "./component/Repository"
import { BrowserRouter as Router,Route,Routes, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Apps() {

  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
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
    console.log(userData, 'userData-=-=-')
    if (userData) {
      const userId = JSON.parse(userData).userId;
      console.log(userId, 'uaiiaiaiiaia')
      if (userId > 0 && !isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  }, [])

  console.log(isAuthenticated, 'isAuthenticated-=-=-=')




  return (
    <div className="App overflow-auto">
      {/* <Router> */}
      <div>
        <Routes key={location.pathname} location={location}>
          <Route path="" element={<HomePages />}></Route>
          <Route path="/copilot-mini" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Copilot-o1 mini" llmmodel="o1-mini" llm="copilot" llmkey="copilot|o1-mini" breadcrumb="Home|AI Model|Licensed" headertext="Copilot o1-mini" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/copilot-preview" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Copilot-o1 Preview" llmmodel="o1-preview" llm="copilot" llmkey="copilot|o1-preview" breadcrumb="Home|AI Model|Licensed" headertext="Copilot o1-preview" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/copilot-gpt" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Copilot-Gpt-4o" llmmodel="gpt-4o" llm="copilot" llmkey="copilot|gpt-4o" breadcrumb="Home|AI Model|Licensed" headertext="Copilot Gpt-4o" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/gemini-ai" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Google Gemini" llmmodel="gemini-1.5-flash" llm="gemini" llmkey="gemini|gemini-1.5-flash" breadcrumb="Home|AI Assistant" headertext="Gemini-1.5-flash" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/copilot-cli" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Copilot CLI" llmmodel="cli" llm="copilot" llmkey="copilot|cli" breadcrumb="Home|AI Assistant" headertext="Copilot CLI" /> : <Navigate to="/log-in" />}></Route>

          <Route path="/hf-code-llama" element={isAuthenticated ? <Pages key={location.pathname} aimodel="CodeLlama/CodeLlama-34B-Instruct-hf" llmmodel="codellama/codellama-34b-instruct-hf" llm="huggingface" llmkey="huggingface|codellama/codellama-34b-instruct-hf" breadcrumb="Home|AI Model|Open Source|Huggingface" headertext="CodeLlama/CodeLlama-34B-Instruct-hf" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/hf-microsoft-phi" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Microsoft/Phi-3.5-mini-Instruct" llmmodel="microsoft/phi-3.5-mini-instruct" llm="huggingface" llmkey="huggingface|microsoft/phi-3.5-mini-instruct" breadcrumb="Home|AI Model|Open Source|Huggingface" headertext="Microsoft/Phi-3.5-mini-Instruct" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/hf-mistral-nemo" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Mistralai/Mistral-nemo-Instruct-2407" llmmodel="mistralai/mistral-nemo-instruct-2407" llm="huggingface" llmkey="huggingface|mistralai/mistral-nemo-instruct-2407" breadcrumb="Home|AI Model|Open Source|Huggingface" headertext="Mistralai/Mistral-nemo-Instruct-2407" /> : <Navigate to="/log-in" />}></Route>
          <Route path="/hf-nousresearch-hermes" element={isAuthenticated ? <Pages key={location.pathname} aimodel="Nousresearch/Hermes-3-Llama-3.1-8B" llmmodel="nousresearch/hermes-3-llama-3.1-8b" llm="huggingface" llmkey="huggingface|nousresearch/hermes-3-llama-3.1-8b" breadcrumb="Home|AI Model|Open Source|Huggingface" headertext="Nousresearch/Hermes-3-Llama-3.1-8B" /> : <Navigate to="/log-in" />}></Route>

          <Route path="/aws-bedrock" element={isAuthenticated ? <Aws aimodel="AWS BedRock" /> : <Navigate to="/log-in" />} ></Route>
          <Route path="/services" element={isAuthenticated ? <OurServices /> : <Navigate to="/log-in" />}></Route>
          <Route path="/log-in" element={<Login />}></Route>
          <Route path="/sign-up" element={isAuthenticated ? <Signup /> : <Navigate to="/log-in" />}></Route>
          <Route path="/user-list" element={isAuthenticated ? <UserListPage /> : <Navigate to="/log-in" />}></Route>
          <Route path="/create-user" element={isAuthenticated ? <CreateUser /> : <Navigate to="/log-in" />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/deleterepo" element={isAuthenticated ? <DeleteRepoPage /> : <Navigate to="/log-in" />}></Route>
          <Route path="/addrepo" element={isAuthenticated ? <AddRepoPage /> : <Navigate to="/log-in" />}></Route>
          <Route path="/unit-test" element={isAuthenticated ? <UnitTest /> : <Navigate to="/log-in" />} ></Route>
          <Route path="/code-conversion" element={isAuthenticated ? <CodeConversion /> : <Navigate to="/log-in" />}></Route>
          <Route path="/layout-design" element={isAuthenticated ? <LayoutDesign /> : <Navigate to="/log-in" />}></Route>
          <Route path="/video-to-kt" element={isAuthenticated ? <VideoToKTPage /> : <Navigate to="/log-in" />}></Route>
          <Route path="/repo-page" element={isAuthenticated ? <Repository /> : <Navigate to="/log-in" />}></Route>


        </Routes>
      </div>
      {/* </Router> */}
    </div>

  );
}

export default function App() {
  return (
    <Router>
      <Apps />
    </Router>
  )
};
