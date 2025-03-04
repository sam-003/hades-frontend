import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlignJustify, FiImage } from "react-icons/fi";
import { FaSearch, FaRegUserCircle, FaCloudUploadAlt } from "react-icons/fa";
import "./index.css";

function Search() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm) {
      alert("Please enter a song name to search.");
      return;
    }

    // Simulate a search result (Replace this with actual search logic later)
    setResults([`Song: ${searchTerm} - Found`]);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <button className="menu-button" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          <FiAlignJustify />
        </button>
        <span>Search Music</span>
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
        <div className="sidebar-item" onClick={() => navigate("/userdetails")}>
          <FaRegUserCircle />
          {sidebarExpanded && <span>User Details</span>}
        </div>
        <div className="sidebar-item" onClick={() => navigate("/upload")}>
          <FaCloudUploadAlt />
          {sidebarExpanded && <span>Upload</span>}
        </div>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <h2>Search for Music</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter song name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {/* Display Search Results */}
        <div className="search-results">
          {results.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
