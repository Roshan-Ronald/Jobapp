import React, { useState, useMemo, useEffect } from "react";
import { PiUserLight } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiRupee } from "react-icons/bi";
import { X } from "lucide-react";
import Filter from "./Filter";

const initialJobs = [
  {
    id: 1,
    company: "Amazon",
    jobTitle: "Full Stack Developer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: true,
    salary: 1200000,
    location: "Chennai",
    jobType: "Full Time",
    details: ["Great work environment", "Cutting-edge projects"],
  },
];

export default function JobBoard() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobList");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [filter, setFilter] = useState({
    searchTitle: "",
    searchLocation: "",
    jobType: "",
    salaryRange: [10000, 200000],
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedJobs = JSON.parse(localStorage.getItem("jobList")) || initialJobs;
      setJobs(updatedJobs);
    };
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("jobList", JSON.stringify(jobs));
  }, [jobs]);

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobList", JSON.stringify(updatedJobs));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesTitle = job.jobTitle.toLowerCase().includes(filter.searchTitle.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(filter.searchLocation.toLowerCase());
      const matchesJobType = filter.jobType === "" || job.jobType.toLowerCase() === filter.jobType.toLowerCase();
      const monthlySalary = Math.round(job.salary / 12);
      const matchesSalary = monthlySalary >= filter.salaryRange[0] && monthlySalary <= filter.salaryRange[1];
      return matchesTitle && matchesLocation && matchesJobType && matchesSalary;
    });
  }, [filter, jobs]);

  return (
    <main className="min-h-screen bg-white p-6 max-w-[1440px] mx-auto">
      <Filter setFilter={setFilter} />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">No jobs found.</div>
        ) : (
          filteredJobs.map((job) => (
            <article
              key={job.id}
              className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex flex-col min-h-[390px]"
            >
              <button
                onClick={() => handleDelete(job.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <X size={20} />
              </button>
              <div className="flex items-center justify-between mb-2">
                <img src="/logo.jpeg" alt="Company logo" className="h-14 w-14 rounded-xl bg-gray-100 object-contain" />
                <span className="text-xs font-semibold text-black bg-blue-100 px-4 py-1 rounded-lg">
                  {job.postedAgo}
                </span>
              </div>
              <h3 className="font-semibold text-xl mb-1 text-black">{job.jobTitle}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2 gap-3">
                <span className="flex items-center gap-1"><PiUserLight size={18} /> {job.exp}</span>
                <span className="flex items-center gap-1"><HiOutlineBuildingOffice2 size={18} /> {job.onsite ? "Onsite" : "Remote"}</span>
                <span className="flex items-center gap-1"><BiRupee size={18} /> {(job.salary / 100000).toFixed(1)} LPA</span>
              </div>
              <ul className="text-gray-700 text-[15px] flex-1 mb-4 list-disc list-inside">
                {job.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
              </ul>
              <button className="w-full mt-auto bg-[#14a8ff] hover:bg-[#009cf7] text-white text-lg font-semibold py-3 rounded-2xl transition">
                Apply Now
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
