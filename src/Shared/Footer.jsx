import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 px-3 md:px-0 pt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-3xl font-bold text-white">About FoodBridge</h2>
          <p className="mt-4 text-sm">
            FoodBridge connects individuals and organizations to share surplus
            food and reduce waste. Together, we can build a more sustainable
            and compassionate world.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/available-foods" className="hover:text-white">
                Available Foods
              </a>
            </li>
            <li>
              <a href="/add-food" className="hover:text-white">
                Add Food
              </a>
            </li>
            <li>
              <a href="/my-food-requests" className="hover:text-white">
                My Food Requests
              </a>
            </li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li>Email: support@foodbridge.com</li>
            <li>Phone: +1-234-567-890</li>
            <li className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-white"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        
        {/* Copyright */}
        <div className=" md:text-left">
          <h2 className="text-xl font-bold text-white">Legal</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/terms" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
          
        </div>
      </div>
      <div>
      <p className="mt-6 text-sm text-center border-t border-gray-600 py-6">
            &copy; {new Date().getFullYear()} FoodBridge. All rights reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
