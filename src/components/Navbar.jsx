import React from "react";
import { NavData } from "../data/data";

const Navbar = () => {
  return (
    <>
    {/* small navbar */}
      <div className="md:hidden">
        <div className="navbar text-color shadow-sm fixed top-0 left-0 right-0 z-30 bg-black bg-opacity-50 text-white">
          <div className="navbar-start">
            <a href="/" className="px-4 text-xl font-font2">The Ashbourne</a>
          </div>
          
          <div className="navbar-end">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M4 6h16 M4 12h16 M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-xl dropdown-content bg-base-100 rounded-box text-black z-1 mt-3 w-50 p-1 shadow right-0"
              >
                {NavData.map((nav, index) => (
                <li key={index}>
                  <a href={nav.link}>{nav.name}</a>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* navbar */}
      <div className="hidden md:block">
        <div className="navbar bg-black text-white shadow-sm p-4 fixed top-0 left-0 right-0 z-30">
          <div className="flex-1">
            <a href="/" className="px-4 text-xl font-font2">The Ashbourne</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 text-xl font-font1">
              {NavData.map((nav, index) => (
                <li key={index}>
                  <a href={nav.link}>{nav.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
