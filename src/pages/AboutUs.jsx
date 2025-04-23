import React from "react";
import { FaUsers, FaUtensils, FaHandsHelping } from "react-icons/fa";
import Reveal from "../animation/Reveal";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      {/* Our Purpose Section */}
      <Reveal>
        <h1 className="text-4xl font-bold text-teal-600 mb-6">Our Purpose</h1>
        <p className="text-sm max-w-3xl mx-auto mb-8">
          Empowering people to end global hunger. We’re here to make food accessible for everyone.
          Through FoodBridge, you can donate meals, reduce food waste, and make a real difference.
        </p>
      </Reveal>

      {/* Image Section */}
      <Reveal>
        <div className="flex justify-center">
          <img
            className="w-full md:w-2/3 rounded-lg shadow-lg"
            src="https://i.ibb.co.com/9m2zyMxN/Cover-Photo-November-12.jpg"
            alt="Food Aid"
          />
        </div>
      </Reveal>

      {/* Mission Statement */}
      <Reveal>
        <div className="bg-white food-card shadow-lg rounded-lg p-6 mt-8 mx-auto max-w-4xl">
          <p className="text-lg  font-medium">
            There's one thing we’ll never stop believing in:
          </p>
          <h2 className="text-2xl font-bold  mt-2">
            Together, we can be the generation that ends global hunger.
          </h2>
          <p className="mt-4">
            Every day, millions of people suffer from food insecurity, but we believe hunger is
            solvable. With your help, we can create a future where no one goes to bed hungry.
          </p>
        </div>
      </Reveal>

      {/* Our Values Section */}
      <Reveal>
        <h2 className="text-3xl font-bold text-teal-600 mt-16">Our Values</h2>
        <p className="text-lg  max-w-3xl mx-auto mb-8">
          A few important things we live by.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Reveal>
          <div className="p-6 bg-blue-100 food-card rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <FaUsers className="text-5xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Open and Honest</h2>
            <p className="">We ensure transparency in food donations and impact.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="p-6 food-card bg-yellow-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <FaUtensils className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Every Meal Counts</h2>
            <p className="">Every donated meal changes a life, no matter how small.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="p-6 food-card bg-green-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <FaHandsHelping className="text-5xl text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">We’re in This Together</h2>
            <p className="">Ending hunger is a global effort, and we stand united.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AboutUs;
