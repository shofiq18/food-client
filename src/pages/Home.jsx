import React from 'react';
import Banner from './Banner';
import FeaturedFoods from './FeaturedFoods';
import Reveal from '../animation/Reveal';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            {/* Why Choose FoodBridge Section */}
            <section className="py-10 bg-gray-100">
                <div className="container mx-auto text-center px-4">
                    <h2 className=" text-2xl md:text-3xl font-bold mb-6">Why Choose FoodBridge?</h2>
                    <Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-gradient-to-br from-teal-50 to-white hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                            <img
                                src="https://i.ibb.co.com/dcyP0Zb/premium-photo-1723987767059-e0306a03aca5.jpg"
                                alt="Reduce Food Waste"
                                className="w-full h-48 object-cover mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Reduce Food Waste</h3>
                            <p>Join our mission to minimize food waste by sharing surplus food.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-gradient-to-br from-teal-50 to-white hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                            <img
                                src="https://i.ibb.co.com/fNB8Mrb/stamp-out-hunger-national-association-of-letter-carriers.jpg"
                                alt="Help Communities"
                                className="w-full h-48 object-cover mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Help Communities</h3>
                            <p>Support those in need by donating or sharing surplus food.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-gradient-to-br from-teal-50 to-white hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                            <img
                                src="https://i.ibb.co.com/4J63YSV/children-gather-around-a-large-plate-of-food-during-lunch-B14-FDX.jpg"
                                alt="Make a Difference"
                                className="w-full h-48 object-cover mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
                            <p>Your contributions create a positive impact on the environment.</p>
                        </div>
                    </div>
                    </Reveal>
                </div>
            </section>


            {/* Community Impact Section */}
            <section className="py-10 bg-blue-50">
                <div className="container mx-auto text-center px-4">
                    <h2 className=" text-2xl md:text-3xl font-bold mb-6">Our Community Impact</h2>
                   <Reveal>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-4xl font-bold text-blue-500">1,000+</h3>
                            <p className="text-gray-600 mt-2">Meals Donated</p>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-4xl font-bold text-green-500">500+</h3>
                            <p className="text-gray-600 mt-2">Families Helped</p>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-4xl font-bold text-purple-500">50+</h3>
                            <p className="text-gray-600 mt-2">Communities Supported</p>
                        </div>
                    </div>
                   </Reveal>
                    <p className="mt-6 text-lg">
                        Together, we are making a difference. Be part of our journey to create a sustainable future.
                    </p>
                </div>
            </section>


        </div>
    );
};

export default Home;