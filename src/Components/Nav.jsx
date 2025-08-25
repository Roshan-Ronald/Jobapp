import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const goToCreateJobs = () => {
    navigate("/create-job"); 
  };

  return (
    <nav className="max-w-[1040px] mx-auto my-6 bg-white rounded-full shadow-2xl px-12 py-3 flex items-center justify-between">
      <a
        href="#"
        className="flex items-center bg-white rounded-xl shadow-md p-2"
        aria-label="Homepage"
      >
        <img
          src="public/cybermind_works_logo.jpeg"
          alt="Logo"
          className="h-10 w-10 rounded-xl object-contain"
        />
      </a>

      <ul className="hidden md:flex gap-14 font-semibold text-gray-900 text-base tracking-wide">
        <li>
          <a
            href="#"
            className="hover:text-purple-600 transition-colors"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Find Jobs
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Find Talents
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-purple-600 transition-colors">
            About us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Testimonials
          </a>
        </li>
      </ul>

      <button
        onClick={goToCreateJobs}
        className="bg-purple-700 hover:bg-purple-800 transition-colors text-white font-semibold text-base rounded-full px-6 py-2 shadow-lg"
      >
        Create Jobs
      </button>
    </nav>
  );
}
