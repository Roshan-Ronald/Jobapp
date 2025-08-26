import React, { useState } from "react";
import NavBar from "./Nav";
import JobBoard from "./JobBoard";
import CreateJobForm from "./CreateJobForm";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobPostsVersion, setJobPostsVersion] = useState(0);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleJobCreated = () => {
    setModalOpen(false);
    setJobPostsVersion((v) => v + 1);
  };

  return (
    <div className="relative min-h-screen">
      <NavBar onCreateJobClick={openModal} />
      <JobBoard jobPostsVersion={jobPostsVersion} />

      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative">
              <CreateJobForm onJobCreated={handleJobCreated} />
              <button
                className="absolute top-4 right-4 text-gray-400 text-3xl hover:text-gray-700"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
