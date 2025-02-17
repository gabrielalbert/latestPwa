import React, { useState, useRef } from "react";
import NavBar from "./navBar";
import SideBar from "./sidebar";
import Select from "react-select";
import "../../src/unitTest.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import {
  MdOutlineDownloadForOffline,
  MdOutlineNotStarted,
} from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

function UnitTest() {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [tableData, setTableData] = useState([
    {
      "Uploaded File Name": "TestWebApp",
      "Project Type": "C#",
      "Unit Test Type": "nUnit",
      "Output Project Name": "CovertedTestWebApp.zip",
      "Uploaded Date": "11-02-2025",
      "Processed Date": "11-02-2025",
      Actions: "",
    },
    {
      "Uploaded File Name": "TestWebApp",
      "Project Type": "python",
      "Unit Test Type": "Unit",
      "Output Project Name": "CovertedTestWebApp.zip",
      "Uploaded Date": "11-02-2025",
      "Processed Date": "11-02-2025",
      Actions: "",
    },
    {
      "Uploaded File Name": "TestWebApp",
      "Project Type": "java",
      "Unit Test Type": "xUnit",
      "Output Project Name": "CovertedTestWebApp.zip",
      "Uploaded Date": "11-02-2025",
      "Processed Date": "11-02-2025",
      Actions: "",
    },
    {
      "Uploaded File Name": "TestWebApp",
      "Project Type": "java",
      "Unit Test Type": "Unit",
      "Output Project Name": "CovertedTestWebApp.zip",
      "Uploaded Date": "11-02-2025",
      "Processed Date": "11-02-2025",
      Actions: "",
    },
    {
      "Uploaded File Name": "TestWebApp",
      "Project Type": "java",
      "Unit Test Type": "Unit",
      "Output Project Name": "CovertedTestWebApp.zip",
      "Uploaded Date": "11-02-2025",
      "Processed Date": "11-02-2025",
      Actions: "",
    },
  ]);
  const columns = [
    "Uploaded File Name",
    "Project Type",
    "Unit Test Type",
    "Output Project Name",
    "Uploaded Date",
    "Processed Date",
    "Actions",
  ];
  const fileInputRef = useRef(null);

  const options1 = [
    { value: "c#", label: "c#" },
    { value: "java", label: "java" },
    { value: "python", label: "python" },
    { value: "angularjs", label: "angularjs" },
    { value: "typescript", label: "typescript" },
    { value: "reactnative", label: "reactnative" },
    { value: "c", label: "c" },
    { value: "c++", label: "c++" },
    { value: "general", label: "general" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Flutter", label: "Flutter" },
    { value: "android", label: "android" },
  ];
  const options2 = [
    { value: "unit", label: "unit" },
    { value: "nunit", label: "nUnit" },
    { value: "xunit", label: "xUnit" }
    
  ];
  const renderActions = (row) => (
    <div>
      <MdOutlineNotStarted
        className="me-2 action-icons"
        style={{ fontSize: " x-large" }}
        data-tooltip-id="start"
        data-tooltip-content="Start"
      />
      <Tooltip id="start" place="bottom" effect="solid" />
      <AiOutlineStop
        className="me-2 action-icons"
        style={{ fontSize: " x-large" }}
        data-tooltip-id="stop"
        data-tooltip-content="Stop"
      />
      <Tooltip id="stop" place="bottom" effect="solid" />
      <MdOutlineDownloadForOffline
        className="me-2 action-icons"
        style={{ fontSize: " x-large" }}
        data-tooltip-id="download"
        data-tooltip-content="Download"
      />
      <Tooltip id="download" place="bottom" effect="solid" />
    </div>
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = ["cs", "java", "zip", "py", "html"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        alert("Invalid file type!");
        fileInputRef.current.value = "";
      }
    }
  };
  const handleSave = async () => {
    if (!selectedFile || !dropdown1 || !dropdown2) {
      alert("please select a file and both dropdown options");
      return;
    }

    const formData = {
      fileName: selectedFile.name,
      dropdown1,
      dropdown2,
    };
    console.log("Saving Data:", formData);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setDropdown1("");
    setDropdown2("");
    alert("Data saved successfully");
  };
  const handleReset = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setDropdown1("");
    setDropdown2("");
  };
  const handleBrowseClick = (e) => {
    fileInputRef.current?.click();
  };

  return (
    <div className="App">
      <NavBar />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="unittest-container">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Unit test</h2>
            </div>
            <div className="fileBrowser">
              <div className="fileUpload">
                <MdOutlineCloudUpload style={{ fontSize: " xx-large" }} />
                <div className="upload-text">
                  <p>Drag & Drop File Here</p>
                  <p>OR</p>
                  <input
                    type="file"
                    accept=".cs,.java,.zip,.py,.html"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
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
                  {selectedFile && (
                    <p className="mt-2">selectedFile : {selectedFile.name}</p>
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
                placeholder="Source Project Type"
                onChange={setDropdown1}
                isClearable={true}
              />
              <Select
                className="basic-single  dropdown dropdown-options"
                classNamePrefix="select"
                value={dropdown2}
                options={options2}
                placeholder="Unit Test Type"
                onChange={setDropdown2}
                isClearable={true}
              />
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
                      <th key={col} className="th">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td className="td" key={col}>
                          {col === "Actions" && row[col] === ""
                            ? renderActions(row)
                            : row[col] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UnitTest;
