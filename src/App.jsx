import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./app/components/adminPanel/Dashboard";
import Main from "./app/components/Main";
import Students from "./app/components/adminPanel/Students";
import Tutors from "./app/components/adminPanel/Tutors";
import Signup from "./app/components/Signup";
import UserDashboard from "./app/components/userPanel/UserDashboard";
import Tutor from "./app/components/userPanel/Tutor";
import Books from "./app/components/userPanel/Books";
import UserLayout from "./app/components/userPanel/Layout";
import Navbar from "./app/components/Navbar";
import Login from "./app/components/Login";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/user/" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="tutor" element={<Tutor />} />
            <Route path="library" element={<Books />} />
          </Route>
          <Route path="/admin/" element={<Navbar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tutors" element={<Tutors />} />
            <Route path="library" element={<Students />} />
          </Route>
          <Route path="/" element={<Main />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
