import React, { useEffect, useState } from "react";
import NavBar from "../component/navBar";
import SideBar from "../component/sidebar";
import config from "../config"; // Adjust the path as necessary
import { Form, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

const DeleteRepoPage = () => {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");
  const [repos, setRepos] = useState([]);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");

  useEffect(() => {
    axios
      .get(`${config.apiBaseUrl}repo/summary`)
      .then((response) => {
       // console.log(response);
       // console.log(response.data);
        setRepos(response.data);
      })
      .catch((error) => console.error("Error fetching files:", error));
  },[]);

  const fetchFiles = (repoName) => {
    console.log(repoName);
    axios
      .get(`${config.apiBaseUrl}repo/${repoName}/files`)
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
      <NavBar userName={userName} />
      <div
        className="main-container"
        style={{ backgroundColor: "#EAEAEA", height: "-webkit-fill-available" }}
      >
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="addrepository-container">
          <div>            
            <h3>Repository Summary</h3>
            <Table stripped bordered hover>
              <thead>
                <tr>
                  <th>Repository Name</th>
                  <th>File Count</th>
                  <th>Indexed</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo) => (
                  <tr key={repo.repoName}>
                    <td>{repo.repoName}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => fetchFiles(repo.repoName)}
                      >
                        {repo.fileCount}
                        {console.log(repo)}
                      </Button>
                    </td>
                    <td>{repo.indexed.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
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
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRepoPage;
