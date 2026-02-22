
import {NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { logoutUser } from "../../api/auth.api";

export default function AppNavigationBar() {
    
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition-all duration-200 cursor-pointer ${
      isActive
        ? "text-emerald-500"
        : "text-gray-700 dark:text-gray-300 hover:text-emerald-500"
    }`;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-4 z-50 px-4">
        <div
          className="
            w-full
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-800
            shadow-lg shadow-black/5 dark:shadow-black/30
            rounded-2xl
            px-6 py-4
            flex justify-between items-center
          "
        >
          {/* Logo */}
          <h1 className="font-bold text-lg tracking-tight text-gray-800 dark:text-gray-100 select-none cursor-pointer">
            MoNNi
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/app" end className={navLinkClass}>
              Overview
            </NavLink>

            <NavLink to="/app/monthly" className={navLinkClass}>
              Monthly
            </NavLink>

            <NavLink to="/app/yearly" className={navLinkClass}>
              Yearly
            </NavLink>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              {theme === "dark" ? (
                <IoSunny className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <CiLogout className="text-xl" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-700 dark:text-gray-200 cursor-pointer"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="
              md:hidden
              mt-3
              bg-white/90 dark:bg-gray-900/90
              backdrop-blur-md
              border border-gray-200 dark:border-gray-800
              rounded-2xl
              shadow-lg shadow-black/5 dark:shadow-black/30
              p-5 space-y-3
            "
          >
            <div>
              <NavLink
                to="/app"
                end
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Overview
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/app/monthly"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Monthly
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/app/yearly"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Yearly
              </NavLink>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={toggleTheme}
                className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                Toggle Theme
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
