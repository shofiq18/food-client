import React from 'react';
import { useLoaderData } from 'react-router-dom';

const FoodDetails = () => {
    const { foodName, imageUrl, quantity, pickupLocation, expirationDate, notes, donator, status } = useLoaderData();
    
    return (
       <div>
        <h1 className=" text-2xl md:text-3xl lg:text-4xl text-center   font-bold my-10">Food Details</h1>
         <div className="max-w-6xl mx-auto md: flex  gap-8 border rounded-lg shadow p-4 mb-24">
            <div>
                <img
                    src={imageUrl}
                    alt={foodName}
                    className="w-full h-96 object-cover rounded-md mb-4 md:mb-0"
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold">{foodName}</h2>
                <p className="text-gray-600">Quantity: {quantity}</p>
                <p className="text-gray-600">Pickup Location: {pickupLocation}</p>
                <p className="text-gray-600">
                    Expiration Date: {new Date(expirationDate).toLocaleString()}
                </p>
                <p className="text-gray-600">Donator: {donator.name}</p>
                {/* <Link to={`/foods/${_id}`}><button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    View Details
                </button></Link> */}
            </div>
        </div>
       </div>
    );
};

export default FoodDetails;