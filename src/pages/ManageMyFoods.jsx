import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State for Update
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    // Fetch My Foods
    const fetchMyFoods = async () => {
        try {
            const response = await fetch(`http://localhost:5000/my-foods?email=${user.email}`);
            const data = await response.json();
            setFoods(data);
        } catch (error) {
            console.error("Error fetching my foods:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyFoods();
    }, [user.email]);

    // Handle Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this food?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:5000/foods/${id}`, { method: "DELETE" });
            alert("Food deleted successfully!");
            fetchMyFoods(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting food:", error);
            alert("Failed to delete food. Please try again.");
        }
    };

    // Open Update Modal
    const openUpdateModal = (food) => {
        setSelectedFood(food);
        setModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedFood(null);
    };

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedData = {
            foodName: e.target.foodName.value,
            quantity: Number(e.target.quantity.value),
            pickupLocation: e.target.pickupLocation.value,
            notes: e.target.notes.value,
        };

        try {
            await fetch(`http://localhost:5000/foods/${selectedFood._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            alert("Food updated successfully!");
            closeModal();
            fetchMyFoods(); // Refresh the list
        } catch (error) {
            console.error("Error updating food:", error);
            alert("Failed to update food. Please try again.");
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading your donated foods...</div>;
    }

    return (
        <div className="container py-12 mx-auto pr-1  md:p-4 lg:pb-52 lg:pt-12">
            <h1 className="text-2xl text-center md:text-start font-bold mb-6">Manage My Foods</h1>

            {foods.length > 0 ? (
                <div className="overflow-x-auto ">
                    <table className="table-fixed w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-sm">
                                <th className="border border-gray-200 px-2 py-3 w-1/4">Food Name</th>
                                <th className="border border-gray-200 px-2 py-1 w-1/6">Quantity</th>
                                <th className="border border-gray-200 px-2 py-1 w-1/3">Pickup Location</th>
                                <th className="border border-gray-200 px-2 py-1 w-1/4">Expiration Date</th>
                                <th className="border border-gray-200 px-2 py-1 w-1/6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => (
                                <tr key={food._id} className="text-center text-sm">
                                    <td className="border border-gray-200 px-1 py-1 break-words">
                                        {food.foodName}
                                    </td>
                                    <td className="border border-gray-200 px-1 py-1">
                                        {food.quantity}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-1 break-words">
                                        {food.pickupLocation}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-1">
                                        {new Date(food.expirationDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-200    px-1 md:py-3 space-y-2 space-x-3">
                                        <button
                                            onClick={() => openUpdateModal(food)}
                                            className="bg-blue-500  text-white text-xs px-1 py-1 md:px-4 md:py-3 rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="bg-red-500  text-white text-xs px-1 py-1  md:px-4 md:py-3 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500">You have not donated any foods yet.</div>
            )}

            {/* Update Modal */}
            {isModalOpen && selectedFood && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96 max-w-full">
                        <h2 className="text-xl font-semibold mb-4">Update Food</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                name="foodName"
                                defaultValue={selectedFood.foodName}
                                className="w-full border p-2 rounded text-sm"
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                defaultValue={selectedFood.quantity}
                                className="w-full border p-2 rounded text-sm"
                                required
                            />
                            <input
                                type="text"
                                name="pickupLocation"
                                defaultValue={selectedFood.pickupLocation}
                                className="w-full border p-2 rounded text-sm"
                                required
                            />
                            <textarea
                                name="notes"
                                defaultValue={selectedFood.notes}
                                className="w-full border p-2 rounded text-sm"
                                placeholder="Add notes (optional)"
                            ></textarea>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ManageMyFoods;
