import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox } from "@headlessui/react";

const indianCities = [
  "Chennai", "Bangalore", "Hyderabad", "Coimbatore",
  "Pune", "Mumbai", "Noida", "Gurgaon"
];
const jobTypes = ["Internship", "Full Time", "Partime", "Contract"];

export default function CreateJobForm({ onJobCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: JSON.parse(localStorage.getItem("createJobForm")) || {
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: "",
      minSalary: "",
      maxSalary: "",
      deadline: "",
      description: "",
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("createJobForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    const newJob = {
      id: Date.now(),
      companyLogo: "/logo.jpeg",
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

    const storedJobs = JSON.parse(localStorage.getItem("jobList")) || [];
    storedJobs.push(newJob);
    localStorage.setItem("jobList", JSON.stringify(storedJobs));

    reset();
    localStorage.removeItem("createJobForm");
    window.dispatchEvent(new Event("storage"));

    if (typeof onJobCreated === "function") onJobCreated();
  };

  const DownArrow = () => (
    <svg
      className="w-5 h-5 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl"
      noValidate
    >
      <div className="mb-6 text-center">
        <h2 className="font-semibold text-xl">Create Job Opening</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm">Job Title</label>
          <input
            maxLength={20}
            {...register("jobTitle", {
              required: "Job Title is required",
              maxLength: { value: 20, message: "Max 20 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Letters only" },
            })}
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            placeholder="Full Stack Developer"
          />
          {errors.jobTitle && <span className="text-red-500 text-xs">{errors.jobTitle.message}</span>}
        </div>
        <div>
          <label className="block mb-2 text-sm">Company Name</label>
          <input
            maxLength={20}
            {...register("companyName", {
              required: "Company Name is required",
              maxLength: { value: 20, message: "Max 20 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Letters only" },
            })}
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
            placeholder="Amazon"
          />
          {errors.companyName && <span className="text-red-500 text-xs">{errors.companyName.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm">Location</label>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange}>
                <div className="relative">
                  <Listbox.Button className="w-full border rounded-md px-3 py-2 bg-gray-50 text-left flex justify-between items-center">
                    {field.value || "Choose Preferred Location"}
                    <DownArrow />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10 focus:outline-none">
                    {indianCities.map((city) => (
                      <Listbox.Option
                        key={city}
                        value={city}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${active ? "bg-gray-200" : "text-gray-900"}`
                        }
                      >
                        {city}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
        </div>

        <div>
          <label className="block mb-2 text-sm">Job Type</label>
          <Controller
            name="jobType"
            control={control}
            rules={{ required: "Job Type is required" }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange}>
                <div className="relative">
                  <Listbox.Button className="w-full border rounded-md px-3 py-2 bg-gray-50 text-left flex justify-between items-center">
                    {field.value || "Choose"}
                    <DownArrow />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10 focus:outline-none">
                    {jobTypes.map((type) => (
                      <Listbox.Option
                        key={type}
                        value={type}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${active ? "bg-gray-200" : "text-gray-900"}`
                        }
                      >
                        {type}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.jobType && <span className="text-red-500 text-xs">{errors.jobType.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm">Salary Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              {...register("minSalary", {
                required: "Min salary required",
                pattern: { value: /^\d+$/, message: "Numbers only" },
              })}
              className="w-1/2 border rounded-md px-3 py-2 bg-gray-50"
              placeholder="₹ 0"
            />
            <input
              type="number"
              {...register("maxSalary", {
                required: "Max salary required",
                pattern: { value: /^\d+$/, message: "Numbers only" },
              })}
              className="w-1/2 border rounded-md px-3 py-2 bg-gray-50"
              placeholder="₹ 12,00,000"
            />
          </div>
          {(errors.minSalary || errors.maxSalary) && (
            <span className="text-red-500 text-xs">
              {errors.minSalary?.message || errors.maxSalary?.message}
            </span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm">Application Deadline</label>
          <input
            type="date"
            {...register("deadline", {
              required: "Deadline is required",
              validate: (value) => new Date(value) > new Date() || "Select a future date",
            })}
            className="w-full border rounded-md px-3 py-2 bg-gray-50"
          />
          {errors.deadline && <span className="text-red-500 text-xs">{errors.deadline.message}</span>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm">Job Description</label>
        <textarea
          maxLength={200}
          {...register("description", {
            required: "Description is required",
            minLength: { value: 20, message: "Minimum 20 characters" },
            maxLength: { value: 200, message: "Maximum 200 characters" },
          })}
          rows={3}
          className="w-full border rounded-md px-3 py-2 bg-gray-50 resize-none"
          placeholder="Please share a description to let the candidate know more about the job role"
        />
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>

      {isSubmitSuccessful && <div className="mb-6 text-green-600 text-center">Job submitted!</div>}

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={() => {
            reset();
            localStorage.removeItem("createJobForm");
          }}
          className="border border-gray-400 px-6 py-2 rounded-md bg-white flex items-center"
          style={{ minWidth: 140, borderWidth: 2 }}
        >
          <span style={{ fontSize: "18px", marginRight: 8, lineHeight: 1 }}>
            Save Draft
            <span
              className="ml-3 text-xl"
              style={{ display: "inline-block", transform: "rotate(90deg)" }}
            >
              {"»"}
            </span>
          </span>
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`font-semibold px-8 py-2 rounded-md shadow flex items-center text-white ${
            isValid ? "bg-blue-500" : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Publish <span className="ml-2 text-xl">{"»"}</span>
        </button>
      </div>
    </form>
  );
}
