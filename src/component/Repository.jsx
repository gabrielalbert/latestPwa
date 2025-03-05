import React, { useState, useRef } from "react";
import NavBar from "./navBar";
import SideBar from "./sidebar";
import Select from "react-select";
import "../../src/codeConversion.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import {
  MdOutlineDownloadForOffline,
  MdOutlineNotStarted,
} from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { useEffect } from "react";
import config from "../config";
import { Modal, Table, Button } from "react-bootstrap";

function Repository() {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dropdown1, setDropdown1] = useState("");
  const [tableData, setTableData] = useState([]);
  const [files, setFiles] = useState([]);
  const [conString, setConString] = useState("");
  const [repoName, setRepoName] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Repository Name");
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");

  useEffect(() => {
    axios
      .get(`${config.apiRepoUrl}/summary`)
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        setTableData(response.data);
      })
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const columns = ["repoName", "fileCount", "status", "Actions"];

  const mappingColumns = [
    { api: "repoName", name: "Repository Name" },
    { api: "fileCount", name: "File Count" },
    { api: "status", name: "Status" },
  ];
  const fileInputRef = useRef(null);

  const options1 = [
    { value: "FileSystem", label: "File System" },
    { value: "SQLDB", label: "SQL DB" },
  ];

  const handleRepoTypeSelect = (e) => {
    console.log(e);
    setDropdown1(e);

    if (e === null) {
      setPlaceholder("Enter Repository Name");
    } else if (e.value === "FileSystem") {
      setPlaceholder("Enter Repository Name");
    } else if (e.value === "SQLDB") {
      setPlaceholder("Enter Connnection String");
    }
  };

  const handleStartClick = async (e, repoName) => {
    console.log(e);
    console.log(e.target);
    console.log(repoName, "--reponame from DB");

    //console.log(e.target.getAttribute("data-response-status"), 'ododo');
    //console.log(e.target.getAttribute("data-response-id"), "---stsrt");

    //repoName=repoName?.toLowerCase().replace(/ /g,'_');
    //console.log(repoName,"--repo name passing to add_repo api");

    const vectorDbData = {
      repo_name: repoName,
      metadata: {
        "desc": "test"
      }
    }

    try {
      const response = await fetch(
        `${config.pythonRepoUrl}add_repo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vectorDbData)
        }
      );
      console.log(response);
      const result = await response.json();
      console.log(response);
      console.log(result);

       window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderActions = (row) => (
    <div>
      {console.log(row.repoName, 'row.repoName==')}
      {console.log(row.status, 'row.status===')}
      {(row?.status === "start" || row?.status === "retry") && (
        <>
          <MdOutlineNotStarted
            className="me-2 action-icons"
            style={{ fontSize: " x-large" }}
            data-tooltip-id="start"
            data-tooltip-content="Start"
            data-response-status={row?.status}
            onClick={(e) => handleStartClick(e, row.repoName)}
          />
          <Tooltip id="start" place="bottom" effect="solid" />
        </>
      )}
    </div>
  );



  const handleAddRepoName = (e) => {
    let userRepoName = e.target.value;
    console.log(userRepoName, "---User Entered Reponame");
    userRepoName = userRepoName?.replace(/ /g, '_');
    console.log(userRepoName, "---User Entered Reponame after replacing space");
    setRepoName(userRepoName);
  };

  const handleFolderChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    console.log(files);
  };

  const handleSave = async (e) => {
    if (!selectedFiles || !dropdown1 || !repoName) {
      alert("please select a file, dropdown option and Repo Name");
      return;
    }

    e.preventDefault();

    if (selectedFiles.length === 0) {
      console.log("Folder is Empty");
      return;
    }

    const formData = new FormData();
    formData.append("repoName", repoName);
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    console.log("Saving Data:", formData);
    try {
      const response = await fetch(`${config.pythonRepoUrl}upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Files Upload Failed to Folder");
      }

      const folderFilesData = await response.json();
      console.log(folderFilesData.message);
      window.location.reload(false);
    } catch (error) {
      console.error("Error:" + error);
    }

    setRepoName("");
    setSelectedFiles("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setDropdown1("");
    //alert("Data saved successfully");
  };

  const handleReset = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setDropdown1("");
  };
  const handleBrowseClick = (e) => {
    fileInputRef.current?.click();
  };

  function getDisplayName(col) {
    const mapping = mappingColumns.find((mapped) => mapped.api === col);
    return mapping ? mapping.name : col;
  }

  const fetchFiles = (repoName) => {
    console.log(repoName);
    axios
      .get(`${config.apiRepoUrl}/${repoName}/files`)
      .then((response) => {
        console.log(response);
        // console.log(response.data);
        setFiles(response.data);
        setSelectedRepo(repoName);
        setShowModal(true);
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  return (
    <div className="App">
      <NavBar />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="unittest-container">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Private Repository</h2>
            </div>

            <div className="fileBrowser">
              <div className="fileUpload">
                <MdOutlineCloudUpload style={{ fontSize: " xx-large" }} />
                <div className="upload-text">
                  <p>Drag & Drop Folder Here</p>
                  <p>OR</p>
                  <input
                    type="file"
                    directory="true"
                    webkitdirectory="true"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFolderChange}
                  />
                  <button
                    className="browse-btn"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#808691",
                      },
                    }}
                    variant="contained"
                    type="submit"
                    onClick={handleBrowseClick}
                  >
                    Browse Files
                  </button>
                  {console.log(selectedFiles.length)}
                  {selectedFiles.length > 0 && (
                    <p className="mt-2">Files Selected</p>
                  )}
                </div>
              </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
              <Select
                className="basic-single dropdown dropdown-options"
                classNamePrefix="select"
                value={dropdown1}
                options={options1}
                placeholder="Repository Type"
                onChange={handleRepoTypeSelect}
                isClearable={true}
              />
            </div>
            <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
              <input
                type="text"
                id="repositoryName"
                value={repoName}
                onChange={handleAddRepoName}
                placeholder={placeholder}
                className="form-control"
              ></input>
              <button
                className="btn btn-primary button unit-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn btn-secondary button unit-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <br />
            <div className="table-containers">
              <table className="table">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="th"
                        style={{ textAlign: "center" }}
                      >
                        {getDisplayName(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.repoName}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => fetchFiles(row.repoName)}
                        >
                          {row.fileCount}
                        </Button>
                      </td>
                      <td>{row.status}</td>
                      <td>{renderActions(row)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Files in {selectedRepo} Repository</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table stripped bordered hover>
                    <thead>
                      <tr>
                        <th>Repository Name</th>
                        <th>Original FileName</th>
                        <th>Unique FileName</th>
                        <th>Indexed</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file) => (
                        <tr key={file.uniqueFileName}>
                          <td>{file.repoName}</td>
                          <td>{file.originalFileName}</td>
                          <td>{file.uniqueFileName}</td>
                          <td>{file.indexed.toString()}</td>
                          <td>{file.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Repository;
