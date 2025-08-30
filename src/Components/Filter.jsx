import React, { useState, useEffect } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { PiUserSoundThin } from "react-icons/pi";
import { Range } from "react-range";

const Filter = ({ setFilter }) => {
  const MIN = 10000;
  const MAX = 200000;

  const [values, setValues] = useState([MIN, MAX]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    setFilter({
      searchTitle,
      searchLocation,
      jobType,
      salaryRange: null,
    });
  }, [searchTitle, searchLocation, jobType, setFilter]);

  const onRangeChange = (vals) => {
    setValues(vals);
    setFilter({
      searchTitle,
      searchLocation,
      jobType,
      salaryRange: vals,
    });
  };

  const getTrackBackground = () =>
    `linear-gradient(to right, #d1d5db 0%, #d1d5db ${
      ((values[0] - MIN) / (MAX - MIN)) * 100
    }%, #000 ${(values[0] - MIN) / (MAX - MIN) * 100}%, #000 ${
      ((values[1] - MIN) / (MAX - MIN)) * 100
    }%, #d1d5db ${((values[1] - MIN) / (MAX - MIN)) * 100}%, #d1d5db 100%)`;

  return (
    <div className="flex flex-col px-10 md:flex-row text-[#686868] py-6 md:py-8 justify-between items-stretch md:items-center gap-6 md:gap-4">
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
        <select
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border-none outline-none bg-transparent text-base w-full"
        >
          <option value="">Preferred Location</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Noida">Noida</option>
          <option value="Gurgaon">Gurgaon</option>
        </select>
      </div>

      <div className="flex gap-4 w-full md:w-80 border-b md:border-b-0 md:border-r-2 border-[#EAEAEA] pb-2 md:pb-0 md:pr-4">
        <PiUserSoundThin className="h-6 w-6 md:h-7 md:w-7 font-semibold" />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border-none outline-none bg-transparent text-base w-full"
        >
          <option value="">Job Type</option>
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
          min={MIN}
          max={MAX}
          values={values}
          onChange={onRangeChange}
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
