import React, { useState, useEffect } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { PiUserSoundThin } from "react-icons/pi";
import { Range } from "react-range";

const Filter = ({ setFilter }) => {
  const [values, setValues] = useState([10000, 120000]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    setFilter({
      searchTitle,
      searchLocation,
      jobType,
      salaryRange: values,
    });
  }, [searchTitle, searchLocation, jobType, values, setFilter]);

  const min = 10000;
  const max = 200000;

  const getTrackBackground = () =>
    `linear-gradient(to right, #d1d5db 0%, #d1d5db ${
      ((values[0] - min) / (max - min)) * 100
    }%, #000 ${(values[0] - min) / (max - min) * 100}%, #000 ${
      ((values[1] - min) / (max - min)) * 100
    }%, #d1d5db ${((values[1] - min) / (max - min)) * 100}%, #d1d5db 100%)`;

  return (
    <div className="flex flex-col px-10 md:flex-row text-[#686868] py-6 md:py-8 justify-between items-stretch md:items-center gap-6 md:gap-4">
      {/* Search Input */}
      <div className="flex gap-4 w-full md:w-80 border-b md:border-b-0 md:border-r-2 border-[#EAEAEA] pb-2 md:pb-0 md:pr-4">
        <CiSearch className="h-6 w-6 md:h-7 md:w-7 font-semibold" />
        <input
          type="text"
          placeholder="Search by job title, role"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border-none outline-none bg-transparent placeholder-gray-400 text-base w-full"
        />
      </div>

      <div className="flex gap-4 w-full md:w-80 border-b md:border-b-0 md:border-r-2 border-[#EAEAEA] pb-2 md:pb-0 md:pr-4">
        <CiLocationOn className="h-6 w-6 md:h-7 md:w-7 font-semibold" />
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border-none outline-none bg-transparent placeholder-gray-400 text-base w-full"
        />
      </div>

      <div className="flex gap-4 w-full md:w-80 border-b md:border-b-0 md:border-r-2 border-[#EAEAEA] pb-2 md:pb-0 md:pr-4">
        <PiUserSoundThin className="h-6 w-6 md:h-7 md:w-7 font-semibold" />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border-none outline-none bg-transparent text-base w-full"
        >
          <option value="">Select Job Type</option>
          <option value="full time">Full Time</option>
          <option value="internship">Internship</option>
          <option value="part time">Part Time</option>
        </select>
      </div>

      <div className="flex flex-col gap-3 w-full md:w-80 text-black">
        <div className="flex justify-between text-sm mb-2">
          <p className="font-medium">Salary Per Month</p>
          <p>
            ₹{(values[0] / 1000).toFixed(0)}k - ₹{(values[1] / 1000).toFixed(0)}k
          </p>
        </div>

        <Range
          step={1000}
          min={min}
          max={max}
          values={values}
          onChange={(vals) => setValues(vals)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-1 w-full rounded"
              style={{ background: getTrackBackground() }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-5 w-5 bg-white border-2 border-black rounded-full"
            />
          )}
        />
      </div>
    </div>
  );
};

export default Filter;
