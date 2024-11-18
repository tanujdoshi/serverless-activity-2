import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import CreateUser from "./Components/CreateUser";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
