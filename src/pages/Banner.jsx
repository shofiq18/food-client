import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../animation/Reveal";


const Banner = () => {
    return (
        <Reveal>
            <div
            className="relative lg:w-full h-[350px] md:h-[700px] bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co.com/Z2TsKv0/background-image-featuring-a-paper-bag-filled-with-healthy-vegan-and-vegetarian-food-including-free.jpg')", 
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0  bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
                    Welcome to FoodBridge
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl">
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
