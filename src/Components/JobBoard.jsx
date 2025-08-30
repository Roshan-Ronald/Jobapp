import React, { useState, useMemo, useEffect } from "react";
import { PiUserLight } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiRupee } from "react-icons/bi";
import Filter from "./Filter";

const initialJobs = [
  {
    id: 1,
    company: "Amazon",
    companyLogo: "/logo.jpeg",
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
    company: "Tesla",
    companyLogo: "/tesla_logo.png",
    jobTitle: "Node Js Developer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: true,
    salary: 1200000,
    location: "Bangalore",
    jobType: "Full Time",
    details: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
  },
  {
    id: 3,
    company: "Swiggy",
    companyLogo: "/swiggy_logo.png",
    jobTitle: "UX/UI Designer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: true,
    salary: 1200000,
    location: "Mumbai",
    jobType: "Full Time",
    details: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
  },
  {
    id: 4,
    company: "Amazon",
    companyLogo: "/logo.jpeg",
    jobTitle: "Full Stack Developer",
    postedAgo: "24h Ago",
    exp: "1-3 yr Exp",
    onsite: true,
    salary: 1200000,
    location: "Noida",
    jobType: "Full Time",
    details: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
  },
];

export default function JobBoard({ jobPostsVersion }) {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobList");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [filter, setFilter] = useState({
    searchTitle: "",
    searchLocation: "",
    jobType: "",
    salaryRange: null,
  });

  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const updatedJobs = JSON.parse(localStorage.getItem("jobList")) || initialJobs;
    setJobs(updatedJobs);
  }, [jobPostsVersion]);

  useEffect(() => {
    localStorage.setItem("jobList", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    const isActive =
      filter.searchTitle.trim() !== "" ||
      filter.searchLocation.trim() !== "" ||
      filter.jobType.trim() !== "" ||
      filter.salaryRange !== null;
    setFilterActive(isActive);
  }, [filter]);

  const filteredJobs = useMemo(() => {
    if (!filterActive) return jobs;

    return jobs.filter((job) => {
      const matchesTitle = job.jobTitle.toLowerCase().includes(filter.searchTitle.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(filter.searchLocation.toLowerCase());
      const matchesJobType =
        filter.jobType === "" || job.jobType.toLowerCase() === filter.jobType.toLowerCase();
      const monthlySalary = Math.round(job.salary / 12);
      const matchesSalary =
        filter.salaryRange === null ||
        (monthlySalary >= filter.salaryRange[0] && monthlySalary <= filter.salaryRange[1]);
      return matchesTitle && matchesLocation && matchesJobType && matchesSalary;
    });
  }, [filter, jobs, filterActive]);

  return (
    <main className="min-h-screen bg-white p-6 max-w-[1440px] mx-auto">
      <Filter setFilter={setFilter} />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 p-4 mt-6 justify-items-center">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">No jobs found.</div>
        ) : (
          filteredJobs.map((job) => (
            <article
              key={job.id}
              className="relative bg-white border border-gray-100 rounded-[12px] shadow-sm hover:shadow-lg transition p-5 flex flex-col w-[316px] h-[360px] opacity-100 transform-none"
            >
              <button
                className="absolute top-3 right-3 hidden"
                aria-label="Delete job"
              />
                <div className="flex items-start mb-2 relative ">
                <img
                  src={job.companyLogo || "/logo.jpeg"}
                  alt={`${job.company} logo`}
                  className="w-[65px] h-[65px] rounded-[13px] border border-solid border-gray-300 bg-gray-100 object-contain shadow-lg flex-shrink-0"
                />
                <span className="ml-auto text-s font-semibold text-black bg-blue-100 px-3 py-1 rounded-xl whitespace-nowrap relative ">
                  {job.postedAgo}
                </span>
              </div>
              <h3 className="font-semibold text-xl mb-1 text-black">{job.jobTitle}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2 gap-3 flex-wrap">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <PiUserLight size={18} /> {job.exp}
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <HiOutlineBuildingOffice2 size={18} /> {job.onsite ? "Onsite" : "Remote"}
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <BiRupee size={18} /> {job.salary === 0 ? 0 : Math.round(job.salary / 100000)}LPA
                </span>
              </div>
              <ul className="text-gray-700 text-[15px] flex-1 mb-6 list-disc list-inside break-words">
                {job.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
              <button className="absolute bottom-[12px] left-4 w-[284px] h-[46px] gap-[10px] border border-gray-300 rounded-[10px] px-[10px] pt-[10px] pb-[12px] bg-[#14a8ff] hover:bg-[#009cf7] text-white text-lg font-semibold transition">
                Apply Now
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
