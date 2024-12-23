import React, { useEffect, useState } from "react";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);

    // Fetch foods from the backend
    const fetchFoods = async () => {
        try {
            const response = await fetch("http://localhost:5000/available-foods");
            const data = await response.json();
            setFoods(data);
            setFilteredFoods(data); // Initialize filtered foods
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    // Handle Search by Food Name
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = foods.filter((food) =>
            food.foodName.toLowerCase().includes(term)
        );
        setFilteredFoods(filtered);
    };

    // Handle Sorting by Expiration Date
    const handleSort = (e) => {
        const order = e.target.value;
        setSortOrder(order);

        const sortedFoods = [...filteredFoods].sort((a, b) => {
            const dateA = new Date(a.expirationDate);
            const dateB = new Date(b.expirationDate);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredFoods(sortedFoods);
    };

    if (loading) {
        return <div className="text-center py-10">Loading foods...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className=" text-2xl md:text-3xl lg:text-4xl text-center border-b pt-6  font-bold mb-10">Available Foods</h1>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                {/* Search Bar */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by food name"
                    className="border p-2 rounded w-full md:w-1/3"
                />

                {/* Sort Dropdown */}
                <select
                    value={sortOrder}
                    onChange={handleSort}
                    className="border p-2 rounded"
                >
                    <option value="asc">Sort by Expiration (Ascending)</option>
                    <option value="desc">Sort by Expiration (Descending)</option>
                </select>
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <div key={food._id} className="border rounded-lg shadow p-4">
                            <img
                                src={food.imageUrl}
                                alt={food.foodName}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold">{food.foodName}</h2>
                            <p className="text-gray-600">Quantity: {food.quantity}</p>
                            <p className="text-gray-600">Pickup Location: {food.pickupLocation}</p>
                            <p className="text-gray-600">
                                Expiration Date: {new Date(food.expirationDate).toLocaleString()}
                            </p>
                            <p className="text-gray-600">Donator: {food.donator.name}</p>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No foods match your search or sorting criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableFoods;
