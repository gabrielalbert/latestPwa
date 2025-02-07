import React, { useState } from "react";
import NavBar from "../component/navBar";
import SideBar from "../component/sidebar";
import config from "../config"; // Adjust the path as necessary

const DeleteRepoPage = () => {
  const [selectUser, setselectUser] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");
  const [detailsDeleted,setDetailsDeleted]=useState(false);

  const handleOnChange=(e)=>{
    setselectUser(e.target.value);
  }
  const handleDeleteRepoCancel=(e)=>{
    setselectUser("");
    setDetailsDeleted(false);
  }
  const handleDeleteRepo = async (e) => {
    try {
        console.log(selectUser);
        const response = await fetch(
            `${config.apiBaseUrl}/repo/deleterepo?userid=${selectUser}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const result = await response.json();
          setDetailsDeleted(true);
          setselectUser("");

      console.log("Input fetching data:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <NavBar userName={userName} />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA",height:"-webkit-fill-available" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="addrepository-container">
          <h1 className="header">Delete Repository</h1>
          <div className="container mt-4">
            <label className="form-label">
              Enter UserID:
              <input type="text" onChange={handleOnChange} className="form-control" value={selectUser}></input>
            </label>
            <div className="mt-3">
              <button onClick={handleDeleteRepo} className="btn btn-danger me-2">Delete</button>
              <button onClick={handleDeleteRepoCancel} className="btn btn-primary">Cancel</button>
            </div>
            {detailsDeleted && <p className="mt-3">Details Deleted in DB</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRepoPage;
