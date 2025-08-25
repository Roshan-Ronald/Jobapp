import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const indianCities = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Coimbatore",
    "Pune",
    "Mumbai",
    "Noida",
    "Gurgaon",
];

const jobTypes = ["Full Time", "Contract", "Part Time"];

const jobsData = [
    {
        id: 1,
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        company: "Amazon",
        jobTitle: "Full Stack Developer",
        postedAgo: "24h Ago",
        exp: "1-3 yr Exp",
        onsite: true,
        salary: "12LPA",
        tags: ["remote", "contract"],
        location: "Chennai",
        jobType: "Full Time",
        details: [
            "A user-friendly interface lets you browse stunning photos and videos",
            "Filter destinations based on interests and travel style, and create personalized",
        ],
    },
    {
        id: 2,
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
        company: "Tesla",
        jobTitle: "Node Js Developer",
        postedAgo: "24h Ago",
        exp: "1-3 yr Exp",
        onsite: false,
        salary: "12LPA",
        tags: ["hybrid"],
        location: "Bangalore",
        jobType: "Contract",
        details: [
            "A user-friendly interface lets you browse stunning photos and videos",
            "Filter destinations based on interests and travel style, and create personalized",
        ],
    },
    {
        id: 3,
        companyLogo: "https://logos-download.com/wp-content/uploads/2019/01/Swiggy_Logo.png",
        company: "Swiggy",
        jobTitle: "UX/UI Designer",
        postedAgo: "24h Ago",
        exp: "1-3 yr Exp",
        onsite: true,
        salary: "12LPA",
        tags: ["onsite", "contract"],
        location: "Coimbatore",
        jobType: "Full Time",
        details: [
            "A user-friendly interface lets you browse stunning photos and videos",
            "Filter destinations based on interests and travel style, and create personalized",
        ],
    },
];

while (jobsData.length < 8) {
    const nextJob = { ...jobsData[jobsData.length % 3], id: jobsData.length + 1 };
    jobsData.push(nextJob);
}

export default function JobBoard() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");

    const filteredJobs = jobsData.filter((job) => {
        const searchTerm = search.toLowerCase();
        return (
            (job.jobTitle.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm)) &&
            (location === "" || job.location === location) &&
            (jobType === "" || job.jobType === jobType)
        );
    });

    return (
        <main className="min-h-screen bg-white p-6 max-w-[1440px] mx-auto">
            <header
                className="flex items-center justify-between bg-white px-6 py-5  shadow-[0_1px_8px_0_rgba(90,112,234,0.08)] gap-6 mb-6"
                style={{ minWidth: 890, minHeight: 80 }}
                aria-label="Job search filters"
            >
                <div className="flex items-center flex-1 gap-6">
                    <div className="flex items-center gap-2 border-r border-gray-200 pr-7 min-w-[300px]">
                        <FaSearch className="text-gray-400" size={17} />
                        <input
                            type="search"
                            placeholder="Search By Job Title, Role"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none bg-transparent text-gray-700 w-full"
                            aria-label="Search by job title or role"
                        />
                    </div>
                    <div className="flex items-center gap-3 border-r border-gray-200 pr-7 min-w-[300px]">
                        <FaMapMarkerAlt className="text-gray-400" size={17} />
                        <select
                            aria-label="Preferred location"
                            className="outline-none bg-transparent text-gray-700 p-3 w-full appearance-none"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Preferred Location </option>
                            {indianCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-3 border-r border-gray-200 pr-7 min-w-[300px]">
                        <FaUser className="text-gray-400" size={17} />
                        <select
                            aria-label="Job type"
                            className="outline-none bg-transparent text-gray-700  p-3 w-full appearance-none"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="">Job type</option>
                            {jobTypes.map((type) => (
                                <option key={type} value={type.toLowerCase()}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-3 min-w-[250px]">
                    <span className="text-gray-500 text-sm font-medium whitespace-nowrap">
                        Salary Per Month
                    </span>
                    <input
                        type="range"
                        min="50000"
                        max="80000"
                        step="1000"
                        className="accent-blue-500 w-36"
                        aria-valuemin={50000}
                        aria-valuemax={80000}
                        readOnly
                    />
                    <span className="text-xs font-semibold">₹50k - ₹80k</span>
                </div>
            </header>

            <section
                aria-label="Job listings"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg p-4 shadow-lg bg-white"
            >
                {filteredJobs.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        No jobs found.
                    </div>
                ) : (
                    filteredJobs.map((job) => (
                        <article
                            key={job.id}
                            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
                        >
                            <div className="flex items-center mb-3">
                                <img
                                    src={job.companyLogo}
                                    alt={`${job.company} logo`}
                                    className="h-10 w-10 rounded bg-white p-1 mr-2 border"
                                />
                                <span className="ml-auto text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {job.postedAgo}
                                </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{job.jobTitle}</h3>
                            <div className="flex items-center text-gray-500 text-sm mb-2 gap-2">
                                <span>👤 {job.exp}</span>
                                <span>•</span>
                                <span>🏢 {job.onsite ? "Onsite" : "Remote"}</span>
                                <span>•</span>
                                <span>💸 {job.salary}</span>
                            </div>
                            <ul className="text-xs text-gray-600 flex-1 mb-4 space-y-1">
                                {job.details.map((d, i) => (
                                    <li key={i}>• {d}</li>
                                ))}
                            </ul>
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold mt-auto">
                                Apply Now
                            </button>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}
