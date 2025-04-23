
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../Shared/useAxiosSecure";
import Reveal from "../animation/Reveal";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State for Update
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const axiosSecure = useAxiosSecure();

    // Fetch Foods Function
    const fetchFoods = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/my-foods?email=${user.email}`);
            setFoods(res.data);
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch foods on component mount
    useEffect(() => {
        fetchFoods();
    }, [user.email]);

    // Handle Delete
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/foods/${id}`);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Food deleted successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchFoods(); // Refresh the food list
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to delete food. Please try again.",
                    });
                    console.error("Error deleting food:", error);
                }
            }
        });
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
            await axiosSecure.patch(`/foods/${selectedFood._id}`, updatedData);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Food updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
            fetchFoods();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Failed to update food. Please try again.",
            });
            console.error("Error updating food:", error);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading your donated foods...</div>;
    }

    return (
        <Reveal>
            <div className="container min-h-screen py-8 mx-2 md:mx-4 lg:mx-6 xl:mx-auto px-2 md:px-4 lg:px-6 lg:pt-12 lg:pb-52">
                <h1 className="text-xl md:text-2xl text-center md:text-start font-bold mb-6">Manage My Foods</h1>

                {foods.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="food-card">
                                    <th className="border border-gray-200 px-2 py-2 min-w-[120px] md:min-w-[150px]">Food Name</th>
                                    <th className="border border-gray-200 px-2 py-2 min-w-[80px] md:min-w-[100px]">Quantity</th>
                                    <th className="border border-gray-200 px-2 py-2 min-w-[150px] md:min-w-[200px]">Pickup Location</th>
                                    <th className="border border-gray-200 px-2 py-2 min-w-[120px] md:min-w-[150px]">Expiration Date</th>
                                    <th className="border border-gray-200 px-2 py-2 min-w-[60px] md:min-w-[100px] lg:min-w-[80px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food) => (
                                    <tr key={food._id} className="text-center text-xs md:text-sm">
                                        <td className="border border-gray-200 px-2 py-2 break-words">
                                            {food.foodName}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-2">{food.quantity}</td>
                                        <td className="border border-gray-200 px-2 py-2 break-words">{food.pickupLocation}</td>
                                        <td className="border border-gray-200 px-2 py-2">
                                            {new Date(food.expirationDate).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-3 md:py-4 flex flex-col md:flex-none items-center space-y-2 md:space-y-3">
                                            <button
                                                onClick={() => openUpdateModal(food)}
                                                className="bg-blue-500 text-white text-xs px-2 py-1 md:px-3 md:py-2 rounded hover:bg-blue-600 glow-button glow-blue"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(food._id)}
                                                className="bg-red-500 text-white text-xs px-2 py-1 md:px-3 md:py-2 rounded hover:bg-red-600 glow-button glow-red"
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
                    <div className="text-center text-gray-500 text-sm md:text-base">You have not donated any foods yet.</div>
                )}

                {/* Update Modal */}
                {isModalOpen && selectedFood && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="food-card p-4 md:p-6 rounded shadow-lg w-11/12 max-w-[350px] md:max-w-[450px]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg md:text-xl font-semibold">Update Food</h2>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-lg"
                                >
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <input
                                    type="text"
                                    name="foodName"
                                    defaultValue={selectedFood.foodName}
                                    className="w-full layout-button border p-2 rounded text-sm md:text-base"
                                    required
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    defaultValue={selectedFood.quantity}
                                    className="w-full layout-button border p-2 rounded text-sm md:text-base"
                                    required
                                />
                                <input
                                    type="text"
                                    name="pickupLocation"
                                    defaultValue={selectedFood.pickupLocation}
                                    className="w-full layout-button border p-2 rounded text-sm md:text-base"
                                    required
                                />
                                <textarea
                                    name="notes"
                                    defaultValue={selectedFood.notes}
                                    className="w-full layout-button border p-2 rounded text-sm md:text-base"
                                    placeholder="Add notes (optional)"
                                    rows={3}
                                ></textarea>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-500 text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-green-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Reveal>
    );
};

export default ManageMyFoods;