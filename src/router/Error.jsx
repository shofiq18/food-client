
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            {/* Error Illustration */}
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-8"
            >
                <img 
                    src="https://i.ibb.co.com/YFwsDqWd/warning-8908707-1280.webp" 
                    alt="404 Not Found" 
                    className="w-72 md:w-96"
                />
            </motion.div>

            {/* Error Message */}
            <motion.h2 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-red-500"
            >
                Oops! Page Not Found
            </motion.h2>

            <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-lg text-center">
                The page you are looking for doesn’t exist or was moved.
            </p>

            {/* Back to Home Button */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-6"
            >
                <Link to="/">
                    <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300">
                        Back to Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default Error;
