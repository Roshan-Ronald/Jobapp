import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
    console.log("Form submitted:", data);
    reset();
    localStorage.removeItem("createJobForm");
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

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm text-gray-800">Job Title</label>
          <input
            {...register("jobTitle", {
              required: "Job Title is required",
              minLength: { value: 2, message: "Title must be at least 2 characters" },
              maxLength: { value: 20, message: "Title cannot exceed 20 characters" },
            })}
            className={`w-full border rounded-md px-3 py-2 bg-gray-50 ${
              errors.jobTitle ? "border-red-500" : ""
            }`}
            placeholder="e.g. Frontend Engineer"
            autoComplete="off"
            maxLength={20}
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-500">{errors.jobTitle.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-800">Company Name</label>
          <input
            {...register("companyName", {
              required: "Company Name is required",
              maxLength: { value: 20, message: "Company Name cannot exceed 20 characters" },
            })}
            className={`w-full border rounded-md px-3 py-2 bg-gray-50 ${
              errors.companyName ? "border-red-500" : ""
            }`}
            placeholder="Amazon, Microsoft, Swiggy"
            autoComplete="off"
          />
          {errors.companyName && (
            <p className="text-xs text-red-500">{errors.companyName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm text-gray-800">Location</label>
          <select
            {...register("location", { required: "Location is required" })}
            className={`w-full border rounded-md px-3 py-2 bg-gray-50 ${
              errors.location ? "border-red-500" : ""
            }`}
          >
            <option value="">Choose Preferred Location</option>
            {indianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-xs text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-800">Job Type</label>
          <select
            {...register("jobType", { required: "Job Type is required" })}
            className={`w-full border rounded-md px-3 py-2 bg-gray-50 ${
              errors.jobType ? "border-red-500" : ""
            }`}
          >
            <option value="">Choose Job Type</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.jobType && (
            <p className="text-xs text-red-500">{errors.jobType.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-2 text-sm text-gray-800">Salary Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              {...register("minSalary", {
                required: "Minimum Salary is required",
                min: { value: 1, message: "Min salary must be positive" },
                validate: (value) =>
                  !values.maxSalary || Number(value) <= Number(values.maxSalary) ||
                  "Min salary can't exceed Max salary",
              })}
              className={`w-1/2 border rounded-md px-3 py-2 bg-gray-50 ${
                errors.minSalary ? "border-red-500" : ""
              }`}
              placeholder="₹ 10"
              autoComplete="off"
            />
            <input
              type="number"
              {...register("maxSalary", {
                required: "Maximum Salary is required",
                min: { value: 1, message: "Max salary must be positive" },
                validate: (value) =>
                  !values.minSalary || Number(value) >= Number(values.minSalary) ||
                  "Max salary can't be less than Min salary",
              })}
              className={`w-1/2 border rounded-md px-3 py-2 bg-gray-50 ${
                errors.maxSalary ? "border-red-500" : ""
              }`}
              placeholder="₹ 12,00,000"
              autoComplete="off"
            />
          </div>
          {errors.minSalary && (
            <p className="text-xs text-red-500">{errors.minSalary.message}</p>
          )}
          {errors.maxSalary && (
            <p className="text-xs text-red-500">{errors.maxSalary.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-800">Application Deadline</label>
          <input
            type="date"
            {...register("deadline", {
              required: "Deadline is required",
              validate: (value) =>
                new Date(value) > new Date() || "Deadline must be in the future",
            })}
            className={`w-full border rounded-md px-3 py-2 bg-gray-50 ${
              errors.deadline ? "border-red-500" : ""
            }`}
          />
          {errors.deadline && (
            <p className="text-xs text-red-500">{errors.deadline.message}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm text-gray-800">Job Description</label>
        <textarea
          rows={3}
          {...register("description", {
            required: "Job Description is required",
            minLength: { value: 20, message: "Description must be at least 20 characters" },
            maxLength: { value: 200, message: "Description cannot exceed 200 characters" },
          })}
          className={`w-full border rounded-md px-3 py-2 bg-gray-50 resize-none ${
            errors.description ? "border-red-500" : ""
          }`}
          placeholder="Please share details about the job role"
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {isSubmitSuccessful && (
        <div className="mb-6 text-green-600 text-center font-semibold">
          Job submitted successfully!
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          className="border border-gray-400 text-gray-800 px-6 py-2 rounded-md bg-white hover:bg-gray-50 font-semibold"
          onClick={() => {
            reset({
              jobTitle: "",
              companyName: "",
              location: "",
              jobType: "",
              minSalary: "",
              maxSalary: "",
              deadline: "",
              description: "",
            });
            localStorage.removeItem("createJobForm");
          }}
        >
          Save Draft
        </button>

        <button
          type="submit"
          className="rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 shadow transition inline-flex items-center gap-2"
        >
          Publish <span className="text-xl">»</span>
        </button>
      </div>
    </form>
  );
}
