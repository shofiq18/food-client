import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../animation/Reveal";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [gridColumns, setGridColumns] = useState(3);

  // Fetch foods from the backend
  const fetchFoods = async () => {
    try {
      const response = await fetch(
        "https://assignment-11-server-nine-chi.vercel.app/available-foods"
      );
      const data = await response.json();
      setFoods(data);
      setFilteredFoods(data);
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

  // Toggle between 3 and 2 grid columns
  const toggleLayout = () => {
    setGridColumns((prevColumns) => (prevColumns === 3 ? 2 : 3));
  };

  if (loading) {
    return <div className="text-center py-10">Loading foods...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center border-b pt-6 font-bold mb-10">
        Available Foods
      </h1>

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

        {/* Change Layout Button */}
        <button onClick={toggleLayout} className="border p-2 rounded">
          Change Layout ({gridColumns} Columns)
        </button>
      </div>

      {/* Food Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-${gridColumns} lg:grid-cols-${gridColumns} gap-6`}
      >
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Reveal key={food._id}>
              <div
                className="border border-gray-200 rounded-lg shadow-lg p-6 bg-gradient-to-br from-teal-50 to-white hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
              >
                <img
                  src={food.imageUrl}
                  alt={food.foodName}
                  className="w-full h-48 object-cover rounded-md mb-4 border border-gray-300"
                />
                <h2 className="text-2xl font-bold text-teal-600 mb-2">
                  {food.foodName}
                </h2>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {food.quantity}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Pickup Location:</span>{" "}
                  {food.pickupLocation}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Expiration Date:</span>{" "}
                  {new Date(food.expirationDate).toLocaleString()}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  <span className="font-semibold">Donator:</span>{" "}
                  {food.donator.name}
                </p>
                <Link to={`/details/${food._id}`}>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold px-4 py-2 rounded-md hover:from-teal-600 hover:to-green-600 transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </Reveal>
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
