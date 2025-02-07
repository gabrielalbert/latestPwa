import { useEffect, useState } from "react";
import NavBar from "./navBar";
import SideBar from "./sidebar";
import config from "../config"; // Adjust the path as necessary
import {
  DropdownButton,
  Form,
  Dropdown,
  Button,
  DropdownToggle,
} from "react-bootstrap";

const AddRepoPage = () => {
  const [repoType, setRepoType] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [conString, setConString] = useState("");
  const [repoName, setRepoName] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRepoTypeSelect = (e) => {
    setRepoType(e.target.value);
    setFiles("");
    setConString("");
    setRepoName("");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAddRepoName = (e) => {
    setRepoName(e.target.value);
    if (e.target.value) {
      setErrorMessage("");
    }
  };
  const handleFolderChange = (e) => {
    const userSelectedFiles = Array.from(e.target.files);
    setFiles(userSelectedFiles);
    setSelectAll(false);
    setSelectedFiles([]);
    console.log(userSelectedFiles);
  };

  const handleSelectAllChange = (e) => {
    e.stopPropagation();
    if (!selectAll) {
      setSelectedFiles(files);
    } else {
      setSelectedFiles([]);
    }

    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    const fileName = e.target.value;
    console.log(fileName);
    if (e.target.checked) {
      setSelectedFiles((prev) => [
        ...prev,
        files.find((file) => file.name === fileName),
      ]);
    } else {
      setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
    }
    console.log(selectedFiles);
  };

  useEffect(() => {
    if (selectedFiles.length === files.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedFiles, files]);

  const handleFolderSubmit = async (e) => {
    console.log("Handle Save");
    e.preventDefault();

    if (!repoName) {
      setErrorMessage("Please enter the repository name");
      return;
    }

    if (selectedFiles.length === 0) {
      console.log("Folder is Empty");
      return;
    }
    const formData = new FormData();
    formData.append("repoName", repoName);
    selectedFiles.forEach((file) => {
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

  const handleCancel = () => {
    setRepoType("");
    setFiles("");
    setConString("");
    setRepoName("");
  };

  return (
    <div className="App">
      <NavBar/>
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
              <div className="mb-3" style={{ textAlign: "left" }}>
                <Form onSubmit={handleFolderSubmit}>
                  <Form.Label>Repository Name:</Form.Label>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      id="repositoryName"
                      value={repoName}
                      onChange={handleAddRepoName}
                      isInvalid={!!errorMessage}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errorMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Choose Folder:</Form.Label>
                    <Form.Control
                      type="file"
                      directory="true"
                      webkitdirectory="true"
                      multiple
                      onChange={handleFolderChange}
                    ></Form.Control>
                  </Form.Group>

                  {files.length > 0 && (
                    <>
                      <Dropdown show={dropdownOpen} onToggle={toggleDropdown} style={{textAlign:"center", marginTop:"15px"}}>
                        <DropdownToggle
                          id="dropdown-basic-button"
                          className="dropdown-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                          }}
                        >
                          Select Files
                        </DropdownToggle>
                        <Dropdown.Menu style={{overflow: "auto", height:"200px"}}>
                          <Dropdown.Item as="div" className="dropdown-item">
                            <Form.Check
                              type="checkbox"
                              label="Select All"
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            ></Form.Check>
                          </Dropdown.Item>

                          {files.map((file, index) => (
                            <Dropdown.Item
                              key={index}
                              as="div"
                              className="dropdown-item"
                            >
                              <Form.Check
                                type="checkbox"
                                label={file.name}
                                value={file.name}
                                checked={selectedFiles.includes(file)}
                                onChange={handleCheckboxChange}
                              ></Form.Check>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <div class="text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        //disabled={!repoName}
                        className="mt-4"
                      >
                        Save
                      </Button>
                      
  

                      <Button style={{marginLeft:"10px"}}
                        className="btn btn-primary mt-4"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      </div>
                    </>
                  )}
                  <ul></ul>
                </Form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRepoPage;
