import React, { useState } from "react";

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

const jobTypes = ["FullTime", "PartTime", "Contract"];

export default function CreateJobForm() {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    deadline: "",
    description: "",
  });

  return (
    <div className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl">
      <div className="mb-6 text-center">
        <h2 className="font-semibold text-xl">Create Job Opening</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm text-gray-800">Job Title</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            value={form.jobTitle}
            onChange={e => setForm(f => ({ ...f, jobTitle: e.target.value }))}
            placeholder="e.g. Frontend Engineer"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-800">Company Name</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            value={form.companyName}
            onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
            placeholder="Amazon, Microsoft, Swiggy"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm text-gray-800">Location</label>
          <select
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          >
            <option value="">Choose Preferred Location</option>
            {indianCities.map(city => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-800">Job Type</label>
          <select
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            value={form.jobType}
            onChange={e => setForm(f => ({ ...f, jobType: e.target.value }))}
          >
            <option value="">FullTime</option>
            {jobTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm text-gray-800">Salary Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-1/2 border rounded-md px-3 py-2 bg-gray-50"
              value={form.minSalary}
              onChange={e => setForm(f => ({ ...f, minSalary: e.target.value }))}
              placeholder="₹ 10"
            />
            <input
              type="number"
              className="w-1/2 border rounded-md px-3 py-2 bg-gray-50"
              value={form.maxSalary}
              onChange={e => setForm(f => ({ ...f, maxSalary: e.target.value }))}
              placeholder="₹ 12,00,000"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-800">Application Deadline</label>
          <input
            type="date"
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            value={form.deadline}
            onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm text-gray-800">Job Description</label>
        <textarea
          rows={3}
          className="w-full border rounded-md px-3 py-2 bg-gray-50 resize-none"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Please share a description to let the candidate know more about the job role"
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <button className="border border-gray-400 text-gray-800 px-6 py-2 rounded-md bg-white hover:bg-gray-50 font-semibold">
          Save Draft
        </button>
        <button className="rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 shadow transition inline-flex items-center gap-2">
          Publish <span className="text-xl">»</span>
        </button>
      </div>
    </div>
  );
}
