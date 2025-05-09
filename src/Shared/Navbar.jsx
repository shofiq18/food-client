
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out!");
      })
      .catch(() => {
        toast.error("Error logging out. Please try again!");
      });
  };

  // Define links as an array of objects
  const links = [
    { id: "home", to: "/", label: "Home" },
    { id: "foods", to: "/foods", label: "Foods" },
    ...(user?.email
      ? [
          { id: "add", to: "/add", label: "Add Food" },
          { id: "my-foods", to: "/my-foods", label: "My Foods" },
          { id: "my-request", to: "/my-request", label: "My Request" },
        ]
      : []),
    { id: "about", to: "/about", label: "About Us" },
    {
      id: "theme-toggle",
      component: (
        <div className="flex items-center justify-between px-4 py-2 theme-toggle">
          <span>Dark Mode</span>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              />
            </svg>
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              />
            </svg>
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="sticky top-0 z-50 shadow-lg navbar">
      <div className="container  md:mx-4 lg:mx-6 xl:mx-auto max-w-[1280px] lg:max-w-[1280px] xl:max-w-[1536px] flex items-center px-2 md:px-4 lg:px-8">
        {/* Dropdown for Mobile */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost" aria-label="Open Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-4 shadow-lg rounded-box w-64 md:w-72"
          >
            {links.map((link) => (
              <li key={link.id}>
                {link.component ? (
                  link.component
                ) : (
                  <NavLink
                    to={link.to}
                    className="hover:text-black transition duration-300"
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <div className="navbar-start">
          <img
            className="w-20 md:w-36"
            src="https://i.ibb.co/FhKgmP7/food-bridge-logo-simple.webp"
            alt="FoodBridge Logo"
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 text-base font-medium">
            {links
              .filter((link) => link.id !== "theme-toggle")
              .map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.to}
                    className="hover:text-black transition duration-300"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        {/* User Profile / Login Buttons / Theme Toggle (Desktop) */}
        <div className="navbar-end flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          {/* Theme Toggle for Desktop */}
          <label className="swap swap-rotate hidden lg:flex">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              />
            </svg>
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              />
            </svg>
          </label>

          {user?.photoURL ? (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full user-img object-cover cursor-pointer"
              />
              <span
                className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] hidden group-hover:block bg-[var(--dropdown-bg)] text-[var(--dropdown-text)] text-sm px-3 py-1 rounded-md shadow-lg"
              >
                {user.displayName}
              </span>
            </div>
          ) : (
            <FaUserCircle className="text-4xl user-icon" />
          )}

          {user?.email ? (
            <button
              onClick={handleLogOut}
              className="px-2 md:px-3 lg:px-4 py-2 rounded-sm btn-logout text-white"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="px-2 md:px-3 lg:px-4 py-2 rounded-sm btn-login text-white">
                Log In
              </button>
            </Link>
          )}

          {!user?.email && (
            <Link to="/signup">
              <button className="px-2 md:px-3 lg:px-4 py-2 rounded-sm hidden md:inline-block btn-signup text-white">
                Signup
              </button>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Navbar;