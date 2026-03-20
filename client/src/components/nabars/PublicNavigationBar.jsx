import { NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMoon,FaLaptop } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef, useEffect } from "react";

export default function PublicNavbar() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const nextTheme = {
    system: "light",
    light: "dark",
    dark: "system",
  };

  const location = useLocation();
  const navLinkClass = (hash) =>
    `font-medium transition duration-200 cursor-pointer ${
      location.hash === hash || (hash === "" && location.pathname === "/")
        ? "text-emerald-500"
        : "text-gray-700 dark:text-gray-300 hover:text-emerald-500"
    }`;

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
        <h1 className="font-bold text-lg tracking-tight text-gray-800 dark:text-gray-100 cursor-pointer">
          MoNNi
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass("")}>
            Home
          </NavLink>

          <NavLink
            to="/#features"
            end
            onClick={() => setIsOpen(false)}
            className={navLinkClass("#features")}
          >
            Features
          </NavLink>

          <NavLink
            to="/#contact"
            end
            onClick={() => setIsOpen(false)}
            className={navLinkClass("#contact")}
          >
            Contact
          </NavLink>

          <NavLink to="/login">Login</NavLink>

          <NavLink
            to="/register"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition cursor-pointer"
          >
            Register
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(nextTheme[theme])}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            {theme === "dark" ? (
              <IoSunny />
            ) : theme === "system" ? (
              <FaLaptop />
            ) : (
              <FaMoon />
            )}
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
            p-5 space-y-4
          "
        >
          <div>
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className={navLinkClass("")}
            >
              Home
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/#features"
              end
              onClick={() => setIsOpen(false)}
              className={navLinkClass("#features")}
            >
              Features
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/#contact"
              end
              onClick={() => setIsOpen(false)}
              className={navLinkClass("#contact")}
            >
              Contact
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={navLinkClass("login")}
            >
              Login
            </NavLink>
          </div>

          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
          >
            Register
          </NavLink>

          <button
            onClick={() => setTheme(nextTheme[theme])}
            className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <IoSunny />
            ) : theme === "system" ? (
              <FaLaptop />
            ) : (
              <FaMoon />
            )}{" "}
          </button>
        </div>
      )}
    </div>
  );
}
