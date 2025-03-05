import React, { useState, useRef } from "react";
import NavBar from "./navBar";
import SideBar from "./sidebar";
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

function VideoToKTPage() {
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;
  const currentUser = parsedUser?.userName;

  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  //const [uploadedFileId, setUploadedFileId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const[fullFileId, setFullFileId] = useState(null)
  //const [isIdSet,setIsSetId]=useState(false);
  const columns = [
    "fileName",
    "fullFileName",
    "uploadedOn",
    "completedOn",
    "status",
    "Actions",
  ];
  const mappingColumns = [
    { api: "fileName", name: "File Name" },
    { api: "fullFileName", name: "Full FileName" },
    { api: "uploadedOn", name: "Uploaded On" },
    { api: "completedOn", name: "Completed On" },
    { api: "status", name: "Status" },
  ];

  const fetchTableData = async()=> {
    try{
      const response = await axios.get(`${config.apiBaseUrl}docs/video-ppt`)
      console.log(response,'responsnsnnsn')

      const data = await response.data;
      console.log(data,'datattatat')
      setTableData(data)

      // .then((response) => {
      //   //console.log(response);
      //   console.log(response.data);
      //   setTableData(response.data);
      // })
    } catch(error){
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchTableData()
  }, []);

  console.log(fullFileId,'fullFileId-=-=-=')


  const fileInputRef = useRef(null);

  const renderActions = (row) => (
    <div>
    {
    console.log(row,'laopoa')
    }
      {row?.status === "created" && (
        <><MdOutlineNotStarted
          className="me-2 action-icons"
          style={{ fontSize: " x-large" }}
          data-tooltip-id="start"
          data-tooltip-content="Start"
          data-response-id={row?.fullFileName}
          data-response-status={row?.status}
          onClick={handleStartClick} 
          /><Tooltip id="start" place="bottom" effect="solid" /></>
      )}
      {row?.status !== "created" && row?.status !== "completed" && (
        <><AiOutlineStop
          className="me-2 action-icons"
          style={{ fontSize: " x-large" }}
          data-tooltip-id="stop"
          data-tooltip-content="Stop"
          data-response-id={row?.fullFileName}
          data-response-status={row?.status}
          onClick={handleStopClick}
        />
          <Tooltip id="stop" place="bottom" effect="solid" /></>
      )}
      {row.status==="completed" && (
        <><MdOutlineDownloadForOffline
          className="me-2 action-icons"
          style={{ fontSize: " x-large" }}
          data-tooltip-id="download"
          data-tooltip-content="Download"
          data-response-id={row?.fullFileName}
          data-response-status={row?.status}
          onClick={handleDownloadClick}
        />
          <Tooltip id="download" place="bottom" effect="solid" /></>
      )
      }

    </div>
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const selectedFile = e.target.files?.[0];
      if (selectedFile && selectedFile.type.startsWith("video/")) {
        setSelectedFile(selectedFile);
      } else {
        alert("Invalid file type!");
        fileInputRef.current.value = "";
      }
    }
  };

  const handleStartClick = async (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.getAttribute('data-response-status'));
    console.log(e.target.getAttribute("data-response-id"), '---stsrt');
    const responseId = e.target.getAttribute("data-response-id")

    console.log(responseId,'responseId-=-=-')
    if(!responseId){
      console.error("Response Id is null or undefined")
    }
    try {
      const response = await fetch(`${config.pythonDocsUrl}processfile?id=${responseId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      const result = await response.json();
      console.log(response);
      console.log(result);
      console.log(result.id);
      console.log(result.status);
      fetchTableData()
      window.location.reload(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleStopClick = async (e) => {
    console.log(e,'eeeeeee');
    console.log(e.currentTarget.getAttribute("data-response-id"), '---stop');
    const responseId = e.currentTarget.getAttribute("data-response-id")
    if(!responseId){
      console.error("Response Id is null or undefined")
    }
    try {
      const response = await fetch(`${config.pythonDocsUrl}processfile?id=${responseId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      const result = await response.json();
      console.log(response);
      console.log(result);
      console.log(result.id);
      console.log(result.status);
      fetchTableData()
      // window.location.reload(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleDownloadClick = async (e) => {
    console.log(e,'eeeeeee');
    console.log(e.currentTarget.getAttribute("data-response-id"), '---download');
    const responseId = e.currentTarget.getAttribute("data-response-id")
    
    if(!responseId){
      console.error("Response Id is null or undefined")
    }

    try {
      const response = await fetch(`${config.pythonDocsUrl}downloadfile?id=${responseId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      //const result = await response.json();
      //console.log(response);
      //console.log(result);
      //console.log(result.id);
      //console.log(result.status);
      // fetchTableData();
      const blob = await response.blob();
      console.log(blob);
      // Create a link element to trigger the download
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = e.target.getAttribute("data-response-id") + '.pptx'; // Specify the desired file name here
      link.click(); // Trigger the download

      // Clean up by revoking the Object URL
      window.URL.revokeObjectURL(url);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSave = async () => {

    setIsUploading(true);

    if (!selectedFile) {
      alert("please select a video file");
      return;
    }

    const formData = new FormData();
    //formData.append("user_name", currentUser);
    formData.append("file", selectedFile);
    console.log("Saving Data:", formData);
    console.log(currentUser);
    console.log(selectedFile);
    try {
      console.log("inside try");
      const response = await fetch(`${config.pythonDocsUrl}addstatus?user_name=${currentUser}`, {
        method: "POST",
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        body: formData,
      });
      console.log(response);
      const result = await response.json();
      //setUploadedFileId(result.id);
      setFullFileId(result?.fullFileName)
      //setIsSetId(true);
      console.log(response);
      console.log(result);
      fetchTableData()
      // window.location.reload(false);
    }
    catch (error) {
      console.log(error);
    }
    finally{
      setIsUploading(false);
    }


    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // alert("Data saved successfully");
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleBrowseClick = (e) => {
    fileInputRef.current?.click();
  };

  function getDisplayName(col) {
    const mapping = mappingColumns.find((mapped) => mapped.api === col);
    return mapping ? mapping.name : col;
  }

  return (
    <div className="App">
      <NavBar />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="unittest-container">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Video To KT Document </h2>
            </div>
            <div className="fileBrowser">
              <div className="fileUpload">
                <MdOutlineCloudUpload style={{ fontSize: " xx-large" }} />
                <div className="upload-text">
                  <p>Drag & Drop File Here</p>
                  <p>OR</p>
                  <input
                    type="file"
                    accept="video"
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
            <div
              style={{
                display: "flex",
                gap: "30px",
                marginTop: "10px",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-primary button unit-button"
                onClick={handleSave}
              >
                {isUploading ? "Uploading..." : "Upload"}
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
                        {getDisplayName(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td className="td" key={col}>
                          {col === "Actions"
                            ? renderActions(row)
                            : row[col] || ""}
                          {console.log({ row })}
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
export default VideoToKTPage;
