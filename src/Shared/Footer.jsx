import React from "react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaEnvelope,
    FaPhoneAlt,
    FaHome,
    FaPlusSquare,
    FaClipboardList,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 px-6 py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* About Section */}
                <div>
                    <h2 className="text-3xl font-bold text-white">About FoodBridge</h2>
                    <p className="mt-4 text-sm leading-relaxed">
                        FoodBridge connects individuals and organizations to share surplus
                        food and reduce waste. Together, we can build a more sustainable
                        and compassionate world.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h2 className="text-xl font-bold text-white">Quick Links</h2>
                    <ul className="mt-4 space-y-3">
                        <li className="flex items-center space-x-2">
                            <FaHome className="text-teal-500" />
                            <a href="/home" className="hover:text-teal-400">
                                Home
                            </a>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaClipboardList className="text-teal-500" />
                            <a href="/available-foods" className="hover:text-teal-400">
                                Available Foods
                            </a>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaPlusSquare className="text-teal-500" />
                            <a href="/add-food" className="hover:text-teal-400">
                                Add Food
                            </a>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaClipboardList className="text-teal-500" />
                            <a href="/my-food-requests" className="hover:text-teal-400">
                                My Food Requests
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h2 className="text-xl font-bold text-white">Contact Us</h2>
                    <ul className="mt-4 space-y-3">
                        <li className="flex items-center space-x-2">
                            <FaEnvelope className="text-teal-500" />
                            <span>Email: support@foodbridge.com</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FaPhoneAlt className="text-teal-500" />
                            <span>Phone: +1-234-567-890</span>
                        </li>
                    </ul>
                    <div className="flex space-x-4 mt-6">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-white text-xl"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-white text-xl"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 hover:text-white text-xl"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                {/* Legal Section */}
                <div>
                    <h2 className="text-xl font-bold text-white">Legal</h2>
                    <ul className="mt-4 space-y-3">
                        <li>
                            <a href="/terms" className="hover:text-teal-400">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:text-teal-400">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="mt-10 border-t border-gray-600 pt-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} <span className="text-teal-400">FoodBridge</span>. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
