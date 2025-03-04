import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlignJustify, FiImage } from "react-icons/fi";
import { FaSearch, FaRegUserCircle, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import "./index.css";

function Upload() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFileDetails(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <button className="menu-button" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          <FiAlignJustify />
        </button>
        <span>Upload Music</span>
        <button onClick={() => navigate("/")}>Dashboard</button>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarExpanded ? "expanded" : ""}`}>
        <div className="sidebar-item" onClick={() => navigate("/")}>
          <FiImage />
          {sidebarExpanded && <span>Dashboard</span>}
        </div>
        <div className="sidebar-item" onClick={() => navigate("/search")}>
          <FaSearch />
          {sidebarExpanded && <span>Search</span>}
        </div>
        <div className="sidebar-item"onClick={() => navigate("/userdetails")}>
          <FaRegUserCircle />
          {sidebarExpanded && <span>User Details</span>}
        </div>
        <div className="sidebar-item" onClick={() => navigate("/upload")}>
          <FaCloudUploadAlt />
          {sidebarExpanded && <span>Upload</span>}
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-container">
        <h2>Upload Music</h2>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button className="upload-button" onClick={handleUpload}>
          <FaCloudUploadAlt /> Upload
        </button>

        {/* Display File Details */}
        {fileDetails && (
          <div className="file-info">
            <p><strong>Filename:</strong> {fileDetails.filename}</p>
            <p><strong>Duration:</strong> {fileDetails.duration}</p>
            <p><strong>Fingerprint Hash:</strong></p>
            <textarea
              value={fileDetails.hash}
              readOnly
              rows="4"
              style={{ width: "100%", resize: "none" }}
            />
            <p><strong>Genre:</strong> {fileDetails.genre}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
