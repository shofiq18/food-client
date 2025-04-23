
import React, { useState } from 'react';
import Banner from './Banner';
import FeaturedFoods from './FeaturedFoods';
import Reveal from '../animation/Reveal';

const faqs = [
    { question: "How does FoodBridge work?", answer: "FoodBridge connects individuals with surplus food to those in need through a seamless online platform." },
    { question: "Is FoodBridge free to use?", answer: "Yes! FoodBridge is completely free to use for both donors and recipients." },
    { question: "How can I donate food?", answer: "You can list surplus food items on our platform, and nearby users in need can request to collect them." },
    { question: "Is the food quality checked?", answer: "We encourage donors to share only fresh and edible food, and our community-driven rating system helps ensure quality." },
    { question: "How can I get involved?", answer: "You can donate food, volunteer, or spread the word to help us fight food waste and hunger!" }
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <Banner />
            <FeaturedFoods />
            {/* Why Choose FoodBridge Section */}
            <section className=" py-10">
                <div className="container mx-auto text-center px-4">
                    <h2 className="section-heading text-2xl md:text-3xl font-bold mb-10">Why Choose FoodBridge?</h2>
                    <Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="why-card rounded-lg shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                                <img
                                    src="https://i.ibb.co.com/dcyP0Zb/premium-photo-1723987767059-e0306a03aca5.jpg"
                                    alt="Reduce Food Waste"
                                    className="w-full h-48 object-cover mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">Reduce Food Waste</h3>
                                <p>Join our mission to minimize food waste by sharing surplus food.</p>
                            </div>
                            <div className="why-card rounded-lg shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                                <img
                                    src="https://i.ibb.co.com/fNB8Mrb/stamp-out-hunger-national-association-of-letter-carriers.jpg"
                                    alt="Help Communities"
                                    className="w-full h-48 object-cover mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">Help Communities</h3>
                                <p>Support those in need by donating or sharing surplus food.</p>
                            </div>
                            <div className="why-card rounded-lg shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
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
            <section className=" py-16">
                <div className="container mx-auto text-center px-4">
                    <h2 className="section-heading text-2xl md:text-3xl font-bold mb-16">Our Community Impact</h2>
                    <Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="community-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-4xl font-bold">1,000+</h3>
                                <p className="mt-2">Meals Donated</p>
                            </div>
                            <div className="community-green p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-4xl font-bold">500+</h3>
                                <p className="mt-2">Families Helped</p>
                            </div>
                            <div className="community-purple p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-4xl font-bold">50+</h3>
                                <p className="mt-2">Communities Supported</p>
                            </div>
                        </div>
                    </Reveal>
                    <p className="mt-6 text-lg" style={{ color: 'var(--section-text)' }}>
                        Together, we are making a difference. Be part of our journey to create a sustainable future.
                    </p>
                </div>
            </section>

            {/* FAQs Section */}
            <section className=" py-16">
                <div className="container mx-auto px-4">
                    <h2 className="section-heading text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item py-4">
                                <button
                                    className="faq-button w-full text-left flex justify-between items-center text-lg font-medium focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                    <span className="text-xl">
                                        {activeIndex === index ? '−' : '+'}
                                    </span>
                                </button>
                                {activeIndex === index && (
                                    <p className="mt-2" style={{ color: 'var(--section-text)' }}>{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;