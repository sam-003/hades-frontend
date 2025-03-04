import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./Search";
import Upload from "./Upload";
import UserDetails from "./UserDetails";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<Search />} />
      <Route path="/userdetails" element={<UserDetails />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  </Router>
);
