import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobBoard from "./Components/JobBoard";
import CreateJobForm from "./Components/CreateJobForm";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/JobBoard" element={<JobBoard />} />
        <Route path="/create-job" element={<CreateJobForm />} />
      </Routes>
    </Router>
  );
}

export default App;
