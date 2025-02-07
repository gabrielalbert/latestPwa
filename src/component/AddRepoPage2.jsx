import { useState } from "react";
import NavBar from "./navBar";
import SideBar from "./sidebar";
import config from "../config"; // Adjust the path as necessary

const AddRepoPage = () => {
  const [repoType, setRepoType] = useState("");
  const [files, setFiles] = useState("");
  const [conString, setConString] = useState("");
  const [repoName, setRepoName] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");

  const handleRepoTypeSelect = (e) => {
    setRepoType(e.target.value);
    setFiles("");
    setConString("");
    setRepoName("");
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFolderSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      console.log("Folder is Empty");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${config.apiBaseUrl}/repo/uploadfiles`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Files Upload Failed to Folder");
      }

      const folderFilesData = await response.json();
      console.log(folderFilesData);
    } catch (error) {
      console.error("Error:" + error);
    }
  };

  const handleSave = () => {
    if (repoType == "File System" && files) {
      console.log("File selected");
    } else if (repoType == "SQL DB" && conString) {
      console.log("Connection String entered");
    } else {
      console.log("No input provided");
    }
  };

  const handleCancel = () => {
    setRepoType("");
    setFiles("");
    setConString("");
    setRepoName("");
  };

  return (
    <div className="App">
      <NavBar userName={userName} />
      <div
        className="main-container"
        style={{ backgroundColor: "#EAEAEA", height: "-webkit-fill-available" }}
      >
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="addrepository-container">
          <div className="container mt-4">
            <h2>Add Repository</h2>
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label
                htmlFor="repoType"
                className="form-label text-left"
                style={{ Color: "#007bf" }}
              >
                Repository Type
              </label>
              <select
                id="repoType"
                className="form-select"
                value={repoType}
                onChange={handleRepoTypeSelect}
              >
                <option value="" disabled style={{ textAlign: "left" }}>
                  Select Type:
                </option>
                <option value="File System">File System</option>
                <option value="SQL DB">SQL DB</option>
              </select>
            </div>

            {repoType === "File System" && (
              <div>
                <div className="mb-3">
                  <label
                    htmlFor="repositoryName"
                    className="form-label"
                    style={{ textAlign: "left", display: "flex" }}
                  >
                    Repository Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="repositoryName"
                    onChange={(e) => {
                      setRepoName(e.target.value);
                    }}
                  ></input>
                </div>
                <form onSubmit={handleFolderSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="fileInput"
                      className="form-label"
                      style={{ textAlign: "left", display: "flex" }}
                    >
                      Choose Folder:
                    </label>
                    <div>
                      <input
                        type="file"
                        className="form-control"
                        directory="true"
                        webkitdirectory="true"
                        multiple
                        id="fileInput"
                        onChange={handleFileChange}
                      ></input>
                      <button type="submit" className="btn btn-primary mt-4">
                        Upload Folder
                      </button>
                    </div>
                    <ul></ul>
                  </div>
                </form>
              </div>
            )}

            {repoType === "SQL DB" && (
              <div className="mb-3">
                <label
                  htmlFor="connectionString"
                  className="form-label"
                  style={{ textAlign: "left", display: "flex" }}
                >
                  Connection String
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="connectionString"
                  onChange={(e) => {
                    setConString(e.target.value);
                  }}
                ></input>
              </div>
            )}

            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-primary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRepoPage;
