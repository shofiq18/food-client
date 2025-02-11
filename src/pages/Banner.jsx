
import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../animation/Reveal";
import { easeOut, motion } from "framer-motion";

const Banner = () => {
    return (
        <Reveal>
            <div className="relative lg:w-full h-[350px] md:h-[700px] bg-black">
                {/* Background Video */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
                    <motion.h1
                        animate={{ x: 100 }}
                        transition={{ duration: 5, delay: 3, ease: easeOut, repeat: Infinity }}
                        className="text-3xl text-gray-200 md:text-4xl lg:text-5xl font-bold"
                    >
                        Welcome to{" "}
                        <motion.span
                            animate={{ color: ["#141414", "#8a07e8", "#15e62a"] }}
                            transition={{ duration: 1.5, delay: 2, ease: easeOut, repeat: Infinity }}
                        >
                            FoodBridge
                        </motion.span>
                    </motion.h1>
                    <p className="mt-4 text-lg text-gray-300 md:text-lg max-w-2xl">
                        Reduce food waste, share surplus, and make a difference in your 
                        community. Join us today to build a better tomorrow!
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                        <Link
                            to="/foods"
                            className="bg-green-600 hover:bg-green-400 text-white px-2 md:px-6 py-3 rounded-lg font-medium"
                        >
                            Explore Foods
                        </Link>
                        <Link
                            to="/add"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-6 py-3 rounded-lg font-medium"
                        >
                            Donate Food
                        </Link>
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

export default Banner;
