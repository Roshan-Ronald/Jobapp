import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "../hooks/useLocalStorage";

const indianCities = ["Chennai", "Bangalore", "Hyderabad", "Coimbatore", "Pune", "Mumbai", "Noida", "Gurgaon"];
const jobTypes = ["FullTime", "PartTime", "Internship"];

export default function CreateJobForm() {
  const [savedForm, setSavedForm] = useLocalStorage("createJobForm", {
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    deadline: "",
    description: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: savedForm,
    mode: "onChange",
  });

  const values = watch();

  useEffect(() => {
    setSavedForm(values);
  }, [values, setSavedForm]);

  const onSubmit = (data) => {
    // Create job object
    const newJob = {
      id: Date.now(),
      companyLogo: "/default-logo.png",
      company: data.companyName,
      jobTitle: data.jobTitle,
      postedAgo: "Just now",
      exp: "0-1 yr Exp",
      onsite: true,
      salary: Number(data.maxSalary) || 100000,
      location: data.location,
      jobType: data.jobType,
      details: [data.description],
    };

    // Save job to localStorage
    const storedJobs = JSON.parse(localStorage.getItem("jobList")) || [];
    storedJobs.push(newJob);
    localStorage.setItem("jobList", JSON.stringify(storedJobs));

    console.log("Form submitted:", newJob);

    reset();
    localStorage.removeItem("createJobForm");

    // Dispatch event so JobBoard updates immediately
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl"
      noValidate
    >
      <div className="mb-6 text-center">
        <h2 className="font-semibold text-xl">Create Job Opening</h2>
      </div>

      {/* Job Title & Company */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm">Job Title</label>
          <input
            {...register("jobTitle", { required: "Job Title is required" })}
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            placeholder="Frontend Engineer"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Company Name</label>
          <input
            {...register("companyName", { required: "Company Name is required" })}
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            placeholder="Amazon, Microsoft"
          />
        </div>
      </div>

      {/* Location & Type */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm">Location</label>
          <select {...register("location", { required: true })} className="w-full border rounded-md px-3 py-2 bg-gray-50">
            <option value="">Choose</option>
            {indianCities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm">Job Type</label>
          <select {...register("jobType", { required: true })} className="w-full border rounded-md px-3 py-2 bg-gray-50">
            <option value="">Choose</option>
            {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>

      {/* Salary & Deadline */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm">Salary Range</label>
          <div className="flex gap-2">
            <input type="number" {...register("minSalary", { required: true })} className="w-1/2 border rounded-md px-3 py-2 bg-gray-50" placeholder="Min ₹" />
            <input type="number" {...register("maxSalary", { required: true })} className="w-1/2 border rounded-md px-3 py-2 bg-gray-50" placeholder="Max ₹" />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm">Deadline</label>
          <input type="date" {...register("deadline", { required: true })} className="w-full border rounded-md px-3 py-2 bg-gray-50" />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block mb-2 text-sm">Description</label>
        <textarea {...register("description", { required: true })} rows={3} className="w-full border rounded-md px-3 py-2 bg-gray-50 resize-none" />
      </div>

      {isSubmitSuccessful && <div className="mb-6 text-green-600 text-center">Job submitted!</div>}

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={() => { reset(); localStorage.removeItem("createJobForm"); }}
          className="border border-gray-400 px-6 py-2 rounded-md bg-white"
        >
          Clear Draft
        </button>
        <button type="submit" className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-md shadow">
          Publish
        </button>
      </div>
    </form>
  );
}
