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
                <NavLink to="/" className="hover:text-blue-500">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/foods" className="hover:text-blue-500">
                    Available Foods
                </NavLink>
            </li>
            <li>
                <NavLink to="/add" className="hover:text-blue-500">
                    Add Food
                </NavLink>
            </li>
            <li>
                <NavLink to="/my-foods" className="hover:text-blue-500">
                    Manage My Foods
                </NavLink>
            </li>
            <li>
                <NavLink to="/my-request" className="hover:text-blue-500">
                    My Food Request
                </NavLink>
            </li>
        </>
    );

    return (
        <div
            data-aos="fade-down"
            className="sticky top-0 z-50 shadow-md bg-white py-4"
        >
            <div className="navbar lg:w-[1440px] mx-auto flex items-center px-4 md:px-2">
                {/* Dropdown for Mobile */}
                <div className="dropdown lg:hidden">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost"
                        aria-label="Open Menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-black"
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
                        className="menu dropdown-content mt-3 p-2 shadow-lg bg-white text-black rounded-box w-52"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <div className="navbar-start flex items-center">
                    <Link to="/" className="text-xl md:text-3xl font-bold text-blue-600 ml-2">
                        Food Cycle BD
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4 text-base text-black">
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
                                className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
                            />
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] hidden group-hover:block bg-gray-100 text-black text-sm px-3 py-1 rounded-md shadow-lg">
                                {user.displayName}
                            </span>
                        </div>
                    ) : (
                        <FaUserCircle className="text-4xl text-black" />
                    )}

                    {user?.email ? (
                        <button
                            onClick={handleLogOut}
                            className="btn bg-red-500 text-white hover:bg-red-600"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="btn bg-blue-500 text-white hover:bg-blue-600">
                                Log In
                            </button>
                        </Link>
                    )}

                    <Link to="/signup" className="hidden lg:block">
                        <button className="btn bg-green-500 text-white hover:bg-green-600">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Navbar;
