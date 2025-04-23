import React, { useState } from "react";
import useAxiosSecure from "../Shared/useAxiosSecure";
import Swal from "sweetalert2";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Client-side email validation
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter your email address.",
            });
            setSubmitting(false);
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter a valid email address.",
            });
            setSubmitting(false);
            return;
        }

        try {
            // API call to subscribe
            await axiosSecure.post("/newsletter-subscribe", { email });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Subscribed!",
                text: "Thank you for subscribing to our newsletter.",
                showConfirmButton: false,
                timer: 1500,
            });
            setEmail(""); // Clear the input field
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Subscription Failed",
                text: "Something went wrong. Please try again later.",
            });
            console.error("Error subscribing to newsletter:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="food-card py-12 px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-sm md:text-base mb-6">
                    Stay updated with the latest food donation events and updates!
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="layout-button border p-2 rounded w-full md:w-80 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={submitting}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 glow-button glow-blue transition-opacity duration-300 ${
                            submitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {submitting ? "Subscribing..." : "Subscribe"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;