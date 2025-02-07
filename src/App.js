import React, { useState } from "react";
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
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() { 
  return (
    <div className="App overflow-auto">
    <Router>
    <div>
      <Routes>
       <Route path="" element={<HomePages />}></Route>
       <Route path="/copilot" element={<Pages aimodel="Copilot"/>}></Route>
       <Route path="/gemini-ai" element={<Pages aimodel="Gemini AI"/>}></Route>
       <Route path="/open-ai-gpt" element={<Pages aimodel="Open AI-GPT"/>}></Route>
       <Route path="/code-llama" element={<Pages aimodel="CodeLlama/CodeLlama-34B-Instruct-hf"/>}></Route>
       <Route path="/microsoft-phi" element={<Pages aimodel="Microsoft/Phi-3.5-mini-Instruct"/>}></Route>
       <Route path="/mistral-nemo" element={<Pages aimodel="Mistralai/Mistral-nemo-Instruct-2407"/>}></Route>
       <Route path="/nousresearch-hermes" element={<Pages aimodel="Nousresearch/Hermes-3-Llama-3.1-8B"/>}></Route>
       <Route path="/aws-bedrock" element={<Aws aimodel="AWS BedRock"/>}></Route>
       <Route path="/services" element={<OurServices/>}></Route>
       <Route path="/log-in" element={<Login/>}></Route>
       <Route path="/sign-up" element={<Signup/>}></Route>
       <Route path="/user-list" element={<UserListPage/>}></Route>
       <Route path="/create-user" element={<CreateUser/>}></Route>
       <Route path="/change-password" element={<ChangePassword/>}></Route>
       <Route path="/deleterepo" element={<DeleteRepoPage/>}></Route>
       <Route path="/addrepo" element={<AddRepoPage/>}></Route>
      </Routes>
    </div>
  </Router>
  </div>
  );
}

export default App;
