import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AddFood = () => {
    const {user} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        foodName: "",
        imageUrl: "",
        quantity: "",
        pickupLocation: "",
        expirationDate: "",
        notes: "",
    });

    const navigate = useNavigate();

   

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const foodData = {
            foodName: formData.foodName,
            imageUrl: formData.imageUrl,
            quantity: Number(formData.quantity),
            pickupLocation: formData.pickupLocation,
            expirationDate: new Date(formData.expirationDate).toISOString(),
            notes: formData.notes || "",
            donator: {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            },
            status: "Available",
        };
        console.log(foodData)
        console.log(user, user.photoURL)

        try {
           
            const response = await fetch("http://localhost:5000/add-food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(foodData),
            });

            if (response.ok) {
                alert("Food added successfully!");
                navigate("/foods");
            } else {
                alert("Failed to add food. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-14">
            <h1 className="text-4xl text-center my-10 font-bold  border-b">Add a Food Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
                {/* Food Name */}
                <div>
                    <label className="block font-medium mb-2">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Enter the food name"
                    />
                </div>

                {/* Food Image URL */}
                <div>
                    <label className="block font-medium mb-2">Food Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Enter food image URL"
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="block font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Enter quantity"
                    />
                </div>

                {/* Pickup Location */}
                <div>
                    <label className="block font-medium mb-2">Pickup Location</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Enter pickup location"
                    />
                </div>

                {/* Expiration Date */}
                <div>
                    <label className="block font-medium mb-2">Expiration Date/Time</label>
                    <input
                        type="datetime-local"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block font-medium mb-2">Additional Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Add any additional notes (optional)"
                    ></textarea>
                </div>

                {/* Donator Image */}
                <div>
                    <label className="block font-medium mb-2">Your Profile Image</label>
                    <img
                        src={user.photoURL}
                        alt="Donator Profile"
                        className="w-24 h-24 rounded-full border mb-4"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-medium"
                >
                    Add Food
                </button>
            </form>
        </div>
    );
};

export default AddFood;
