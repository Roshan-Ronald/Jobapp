import React, { useState, useMemo } from "react";
import { PiUserLight } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiRupee } from "react-icons/bi";

import Filter from "./Filter";

const initialJobs = [
  {
    id: 1,
    companyLogo: "/Amazon_icon.png",
    company: "Amazon",
    jobTitle: "Full Stack Developer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: true,
    salary: 1200000,
    location: "Chennai",
    jobType: "Full Time",
    details: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
  },
  {
    id: 2,
    companyLogo: "/Tesla-icon.png",
    company: "Tesla",
    jobTitle: "Node Js Developer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: false,
    salary: 1200000,
    location: "Bangalore",
    jobType: "Contract",
    details: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
  },
  {
    id: 3,
    companyLogo: "/Swiggy-icon.jpg",
    company: "Swiggy",
    jobTitle: "UX/UI Designer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: true,
    salary: 1200000,
    location: "Coimbatore",
    jobType: "Full Time",
    details: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
  },
];

while (initialJobs.length < 8) {
  const nextJob = {
    ...initialJobs[initialJobs.length % 3],
    id: initialJobs.length + 1,
  };
  initialJobs.push(nextJob);
}

export default function JobBoard() {
  const [filter, setFilter] = useState({
    searchTitle: "",
    searchLocation: "",
    jobType: "",
    salaryRange: [10000, 200000],
  });

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesTitle = job.jobTitle
        .toLowerCase()
        .includes(filter.searchTitle.toLowerCase());

      const matchesLocation = job.location
        .toLowerCase()
        .includes(filter.searchLocation.toLowerCase());

      const matchesJobType =
        filter.jobType === "" ||
        job.jobType.toLowerCase() === filter.jobType.toLowerCase();

      const monthlySalary = Math.round(job.salary / 12);
      const matchesSalary =
        monthlySalary >= filter.salaryRange[0] &&
        monthlySalary <= filter.salaryRange[1];

      return matchesTitle && matchesLocation && matchesJobType && matchesSalary;
    });
  }, [filter]);

  return (
    <main className="min-h-screen bg-white p-6 max-w-[1440px] mx-auto">
      <Filter setFilter={setFilter} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg p-4 shadow-lg bg-white mt-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No jobs found.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <article
              key={job.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex flex-col min-h-[390px] relative"
            >
              <div className="flex items-center justify-between mb-2">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="h-14 w-14 rounded-xl bg-gray-100 object-contain"
                  style={{ border: "none" }}
                />
                <span className="text-xs font-semibold text-black bg-blue-100 px-4 py-1 rounded-lg">
                  {job.postedAgo}
                </span>
              </div>
              <h3 className="font-semibold text-xl mb-1 text-black">
                {job.jobTitle}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mb-2 gap-3">
                <span className="flex items-center gap-1">
                  <PiUserLight size={18} /> {job.exp}
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineBuildingOffice2 size={18} />{" "}
                  {job.onsite ? "Onsite" : "Remote"}
                </span>
                <span className="flex items-center gap-1">
                  <BiRupee size={18} /> {(job.salary / 100000).toFixed(1)} LPA
                </span>
              </div>
              <ul className="text-gray-700 text-[15px] flex-1 mb-4 space-y-1 mt-1 font-normal list-disc list-inside">
                {job.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
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
