import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Successfully logged out!");
            })
            .catch(() => {
                toast.error("Error logging out. Please try again!");
            });
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className="hover:text-teal-500  transition duration-300"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/foods"
                    className="hover:text-teal-500 transition duration-300"
                >
                    Available Foods
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add"
                    className="hover:text-teal-500 transition duration-300"
                >
                    Add Food
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/my-foods"
                    className="hover:text-teal-500 transition duration-300"
                >
                    Manage My Foods
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/my-request"
                    className="hover:text-teal-500 transition duration-300"
                >
                    My Food Request
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-teal-600 to-green-500 ">
            <div className="navbar lg:w-[1440px] mx-auto flex items-center  md:px-2">
                {/* Dropdown for Mobile */}
                <div className="dropdown lg:hidden">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost text-white"
                        aria-label="Open Menu"
                    >
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
                        className="menu dropdown-content mt-3 p-2 shadow-lg bg-white text-teal-600 rounded-box w-52"
                    >
                        {links}
                        

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

                {/* Navigation Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6 text-base font-medium text-white">
                        {links}
                    </ul>
                </div>

                {/* User Profile / Login Buttons */}
                <div className="navbar-end flex items-center space-x-4">
                    {user?.photoURL ? (
                        <div className="relative group">
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
                            />
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] hidden group-hover:block bg-white text-teal-600 text-sm px-3 py-1 rounded-md shadow-lg">
                                {user.displayName}
                            </span>
                        </div>
                    ) : (
                        <FaUserCircle className="text-4xl text-white" />
                    )}

                    {user?.email ? (
                        <button
                            onClick={handleLogOut}
                            className="px-3 py-2 rounded-sm bg-red-500 text-white hover:bg-red-600"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="px-2 md:px-3 py-2 rounded-sm bg-blue-500 text-white hover:bg-blue-600">
                                Log In
                            </button>
                        </Link>
                    )}

                    {!user?.email && (
                        <Link to="/signup">
                            <button className="px-1 md:px-3 py-2 rounded-sm hidden md:inline-block bg-green-800 text-white hover:bg-purple-600">
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
