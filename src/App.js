import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { FiAlignJustify, FiImage } from "react-icons/fi";
import { FaSearch, FaRegUserCircle, FaCloudUploadAlt } from "react-icons/fa";
import "./index.css";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setWalletAddress(await signer.getAddress());
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("MetaMask is not detected! Please install it from https://metamask.io/");
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <button className="menu-button" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          <FiAlignJustify />
        </button>
        <span>Audio Copyright System</span>
        <button onClick={connectWallet}>{walletAddress ? "Connected" : "CONNECT"}</button>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarExpanded ? "expanded" : ""}`}>
        <div className="sidebar-item">
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
    </div>
  );
}

export default App;
