import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div
            className="relative lg:w-full h-[350px] md:h-[700px]  bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co.com/23MdBrq/assorted-fruits-vegetables-table-with-bowls-grapes-apples-concept-food-photography-healthy-eating-fr.jpg')", // Replace with your banner image URL
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
                <h1 className="text-4xl md:text-6xl font-bold">
                    Welcome to FoodBridge
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl">
                    Reduce food waste, share surplus, and make a difference in your
                    community. Join us today to build a better tomorrow!
                </p>

                {/* Call-to-Action Buttons */}
                <div className="mt-6 flex space-x-4">
                    <Link to='/foods'>
                        <a

                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            Explore Foods
                        </a></Link>
                    <Link to='/add'>
                        <a
                            href="/add-food"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            Donate Food
                        </a></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
