
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../animation/Reveal";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [gridColumns, setGridColumns] = useState(4);

  // Fetch foods from the backend
  const fetchFoods = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/available-foods"
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

  // Toggle between grid column layouts
  const toggleLayout = () => {
    setGridColumns((prevColumns) => (prevColumns === 4 ? 3 : 4));
  };

  if (loading) {
    return <div className="text-center py-10 text-[var(--card-text)]">Loading foods...</div>;
  }

  return (
    <div className=" container mx-auto p-6">
      <h1 className=" text-2xl md:text-3xl lg:text-4xl text-center py-12 font-bold mb-10">
        Available Foods
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by food name"
          className="search-input p-2 rounded w-full md:w-1/3"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={handleSort}
          className="sort-select p-2 rounded"
        >
          <option value="asc">Sort by Expiration (Ascending)</option>
          <option value="desc">Sort by Expiration (Descending)</option>
        </select>

        {/* Change Layout Button */}
        <button onClick={toggleLayout} className="layout-button p-2 rounded">
          Change Layout ({gridColumns === 4 ? "4 Columns" : "3 Columns"})
        </button>
      </div>

      {/* Food Cards */}
      <div
        className={`grid grid-cols-1 ${
          gridColumns === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-1 lg:grid-cols-3"
        } gap-6`}
      >
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Reveal key={food._id}>
              <div className="food-card rounded-lg shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <img
                  src={food.imageUrl}
                  alt={food.foodName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{food.foodName}</h2>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Quantity:</span> {food.quantity}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Pickup Location:</span>{" "}
                  {food.pickupLocation}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Expiration Date:</span>{" "}
                  {new Date(food.expirationDate).toLocaleString()}
                </p>
                <p className="text-sm mb-4">
                  <span className="font-semibold">Donator:</span> {food.donator.name}
                </p>
                <Link to={`/details/${food._id}`}>
                  <button className="food-card-button w-full font-semibold px-4 py-2 rounded-md">
                    View Details
                  </button>
                </Link>
              </div>
            </Reveal>
          ))
        ) : (
          <div className="col-span-full text-center" style={{ color: 'var(--card-text)' }}>
            No foods match your search or sorting criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;