import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaLaptop, FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

export default function AppNavigationBar() {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const dropdownRef = useRef(null);
  const { addToast } = useToast();

  const nextTheme = {
    system: "light",
    light: "dark",
    dark: "system",
  };

  const handleLogout = async () => {
    await logout();
    addToast("Logged out Successfully.", "success");
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
          <NavLink  to ="/app" className="font-bold text-lg tracking-tight text-gray-800 dark:text-gray-100 select-none cursor-pointer">
            MoNNi
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to={"/app"} className={navLinkClass}>
              Overview
            </NavLink>
            <NavLink to="/app/budget" className={navLinkClass}>
              Budget
            </NavLink>

            {/* Profile Avatar with Hover Toolbar */}
            <div
              className="relative"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div className="w-10 h-10 rounded-full ring-2 ring-emerald-300 cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105">
                <img
                  src={user.profile_image || '/NavbarProfileImage.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Toolbar */}
              <AnimatePresence>
                {isProfileHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-2 z-[60] backdrop-blur-sm"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 mb-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                        Current Account
                      </p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate mt-0.5">
                        {user?.name || "Monni User"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      {/* Profile Text */}
                      <button
                        onClick={() => {
                          setIsProfileHovered(false);
                          navigate("/app/profile");
                        }}
                        className="group w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all duration-200"
                      >
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all">
                          <User size={18} />
                        </div>
                        <span className="flex-1 text-left">Profile</span>
                      </button>

                      {/* Theme Toggle */}

                      <button
                        onClick={() => setTheme(nextTheme[theme])}
                        className="group w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all duration-200"
                      >
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all text-lg">
                          {theme === "dark" ? (
                            <IoSunny />
                          ) : theme === "system" ? (
                            <FaLaptop />
                          ) : (
                            <FaMoon />
                          )}
                        </div>
                        <span className="flex-1 text-left">Change Theme</span>
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="group w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200 mt-1"
                      >
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-all text-lg">
                          <CiLogout />
                        </div>
                        <span className="flex-1 text-left">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="
                md:hidden
                mt-3
                bg-white/95 dark:bg-gray-900/95
                backdrop-blur-xl
                border border-gray-100 dark:border-gray-800
                rounded-2xl
                shadow-2xl shadow-black/10 dark:shadow-black/40
                p-6 space-y-6
                z-50
              "
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-24 w-24 rounded-full ring-4 ring-emerald-500/20 p-1">
                  <img
                    src={user.profile_image || "/NavbarProfileImage.png"}
                    alt="User Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-tight">
                    {user?.name || "Monni User"}
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/app/profile");
                    }}
                    className="text-emerald-500 font-medium mt-1 hover:underline"
                  >
                    View Profile
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <NavLink
                  to={"/app"}
                  end
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Overview
                </NavLink>
                <NavLink
                  to="/app/budget"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Budget
                </NavLink>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {theme === "dark" ? (
                    <IoSunny />
                  ) : theme === "system" ? (
                    <FaLaptop />
                  ) : (
                    <FaMoon />
                  )}{" "}
                  Theme
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                >
                  <CiLogout />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
