import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.jpeg";

export default function NavBar({ onCreateJobClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-[890px] mx-auto my-6 bg-white rounded-full shadow-xl border-1 border-gray-300 px-6 md:px-12 py-3 flex items-center justify-between relative">
      <a href="/" className="flex items-center bg-white rounded-xl shadow-md p-2" aria-label="Homepage">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 rounded-xl object-contain"
        />
      </a>

      <ul className="hidden md:flex gap-10 lg:gap-10 font-semibold text-gray-900 text-s tracking-wide">
        <li><a href="/" className="hover:text-purple-600 transition-colors">Home</a></li>
        <li><a href="#" className="hover:text-purple-600 transition-colors">Find Jobs</a></li>
        <li><a href="#" className="hover:text-purple-600 transition-colors">Find Talents</a></li>
        <li><a href="#" className="hover:text-purple-600 transition-colors">About us</a></li>
        <li><a href="#" className="hover:text-purple-600 transition-colors">Testimonials</a></li>
      </ul>

      <button
        onClick={onCreateJobClick}
        className="hidden md:inline bg-purple-700 hover:bg-purple-800 transition-colors cursor-pointer text-white font-semibold text-base rounded-full px-6 py-2 shadow-lg"
      >
        Create Jobs
      </button>

      <button
        className="md:hidden text-gray-700 text-2xl p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg mt-2 py-4 px-6 flex flex-col gap-4 z-50">
          <a href="#" className="font-semibold text-gray-900 hover:text-purple-600">Home</a>
          <a href="#" className="font-semibold text-gray-900 hover:text-purple-600">Find Jobs</a>
          <a href="#" className="font-semibold text-gray-900 hover:text-purple-600">Find Talents</a>
          <a href="#" className="font-semibold text-gray-900 hover:text-purple-600">About us</a>
          <a href="#" className="font-semibold text-gray-900 hover:text-purple-600">Testimonials</a>
          <button
            onClick={() => {
              onCreateJobClick();
              setIsOpen(false);
            }}
            className="bg-purple-700 hover:bg-purple-800 transition-colors text-white font-semibold text-base rounded-full px-6 py-2 shadow-lg w-full"
          >
            Create Jobs
          </button>
        </div>
      )}
    </nav>
  );
}
