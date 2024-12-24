import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const FeaturedFoods = () => {
    const navigate = useNavigate();

    // Fetch Featured Foods from the backend
    
        const {data: foods , isLoading, isError, error } = useQuery({ queryKey: ['foods'], queryFn: async () => {
            const response = await fetch("http://localhost:5000/featured-foods");
            const data = await response.json();
            return data
        } })
       
    if (isLoading) {
        return <Loading></Loading>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Featured Foods</h1>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
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
                        <Link to={`/details/${food._id}`}><button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            View Details
                        </button></Link>
                    </div>
                ))}
            </div>

            {/* Show All Button */}
            <div className="mt-6 text-center">
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
