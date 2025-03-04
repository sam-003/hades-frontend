import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlignJustify, FiImage } from "react-icons/fi";
import { FaSearch, FaRegUserCircle, FaCloudUploadAlt } from "react-icons/fa";
import Web3 from "web3";
import "./index.css";

function UserDetails() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWallet(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <button className="menu-button" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          <FiAlignJustify />
        </button>
        <span>User Details</span>
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

      {/* User Details Section */}
      <div className="user-details-container">
        <h2>User Profile</h2>
        <p><strong>Wallet Address:</strong></p>
        <p className="wallet-address">{wallet || "Not Connected"}</p>
        <p><strong>Uploaded Songs:</strong> None</p>
      </div>
    </div>
  );
}

export default UserDetails;
