import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobBoard from "./Components/JobBoard";
import NavBar from "./Components/Nav";
import CreateJobForm from "./Components/CreateJobForm";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<JobBoard />} />
        <Route path="/create-job" element={<CreateJobForm />} />
      </Routes>
    </Router>
  );
}

export default App;
