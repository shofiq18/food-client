import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Reveal from "../animation/Reveal";

const FeaturedFoods = () => {
    const navigate = useNavigate();

    // Fetch Featured Foods from the backend
    const { data: foods, isLoading, isError, error } = useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const response = await fetch("https://assignment-11-server-nine-chi.vercel.app/featured-foods");
            if (!response.ok) {
                throw new Error("Failed to fetch featured foods");
            }
            return await response.json();
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (

        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-12 mt-6">Featured Foods</h1>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
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
                                <span className="font-semibold">Quantity:</span> {food.quantity}
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
                                <span className="font-semibold">Donator:</span> {food.donator.name}
                            </p>
                            <Link to={`/details/${food._id}`}>
                                <button className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold px-4 py-2 rounded-md hover:from-teal-600 hover:to-green-600 transition duration-300">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Show All Button */}
            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate("/foods")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                    Show All Foods
                </button>
            </div>
        </div>

    );
};

export default FeaturedFoods;
