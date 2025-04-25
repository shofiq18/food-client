
import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const FoodDetails = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // To get the current URL
    const food = useLoaderData();
    const { foodName, imageUrl, quantity, pickupLocation, expirationDate, notes, donator, status, _id } = food;

    const [isModalOpen, setModalOpen] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");

    const openModal = () => {
        // Check if user is logged in
        if (!user) {
            // Redirect to login page, passing the current URL as state from authentication
            navigate("/login", { state: { from: location.pathname } });
            return;
        }
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    // Handle Request Submission
    const handleRequest = async () => {
        const requestDate = new Date().toISOString();

        const requestData = {
            foodId: _id,
            foodName,
            imageUrl,
            foodDonatorEmail: donator.email,
            foodDonatorName: donator.name,
            userEmail: user.email,
            requestDate,
            pickupLocation,
            expirationDate,
            additionalNotes,
            status: "requested",
        };

        try {
            // Update food status in the database
            await fetch(`https://assignment-11-server-nine-chi.vercel.app/foods/${_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "requested" }),
            });

            // Add to My Requests collection
            await fetch("https://assignment-11-server-nine-chi.vercel.app/my-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request submitted successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
            navigate("/foods");
        } catch (error) {
            console.error("Error submitting request:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to submit request. Please try again.",
            });
        }
    };

    return (
        <div className='px-3 md:px-2 lg:px-0'>
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold my-10">Food Details</h1>
            <div className="max-w-6xl mx-auto flex-wrap lg:flex gap-8 border rounded-lg shadow p-4 mb-24">
                <div>
                    <img
                        src={imageUrl}
                        alt={foodName}
                        className="w-full h-[430px] object-cover rounded-md mb-4 md:mb-0"
                    />
                </div>
                <div className='space-y-1'>
                    <h2 className="text-xl font-semibold">{foodName}</h2>
                    <p className="">Quantity: {quantity}</p>
                    <p className="">Pickup Location: {pickupLocation}</p>
                    <p className="">
                        Expiration Date: {new Date(expirationDate).toLocaleString()}
                    </p>
                    <h2 className="">{notes}</h2>
                    <p className="text-lg font-semibold">Donator: {donator.name}</p>
                    <h2 className="text-lg font-semibold">Donator Email: {donator.email}</h2>
                    <h2 className="text-lg font-semibold">Status: {status}</h2>
                    {/* Donator Image */}
                    <div>
                        <label className="block font-medium mb-2">Donator Image</label>
                        <img
                            src={donator.image}
                            alt="Donator Profile"
                            className="w-24 h-24 rounded-full border mb-4"
                        />
                    </div>

                    {/* Request Button */}
                    <button
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={openModal}
                    >
                        Request
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && user && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-8 md:mb-28">
                    <div className="food-card p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Request Food</h2>
                        <div className="space-y-2">
                            <p><strong>Food Name:</strong> {foodName}</p>
                            <p><strong>Food Image:</strong></p>
                            <img src={imageUrl} alt={foodName} className="w-32 h-32 object-cover rounded" />
                            <p><strong>Food ID:</strong> {_id}</p>
                            <p><strong>Donator Email:</strong> {donator.email}</p>
                            <p><strong>Donator Name:</strong> {donator.name}</p>
                            <p><strong>User Email:</strong> {user.email}</p>
                            <p><strong>Request Date:</strong> {new Date().toLocaleString()}</p>
                            <p><strong>Pickup Location:</strong> {pickupLocation}</p>
                            <p><strong>Expiration Date:</strong> {new Date(expirationDate).toLocaleString()}</p>
                            <textarea
                                placeholder="Add additional notes (optional)"
                                className="w-full layout-button border p-2 rounded"
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleRequest}
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;