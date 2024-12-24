import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../Shared/useAxiosSecure";

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

 
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
       axiosSecure.get(`/my-requests?email=${user.email}`)
       .then(res => setRequests(res.data) );
       setLoading(false);

    }, [user.email]);

    if (loading) {
        return <div className="text-center py-10">Loading your requests...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Food Requests</h1>

            {requests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request) => (
                        <div key={request._id} className="border rounded-lg shadow p-4">
                            <img
                                src={request.imageUrl}
                                alt={request.foodName}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold">{request.foodName}</h2>
                            <p className="text-gray-600">Request Date: {new Date(request.requestDate).toLocaleString()}</p>
                            <p className="text-gray-600">Donator: {request.foodDonatorName}</p>
                            <p className="text-gray-600">Pickup Location: {request.pickupLocation}</p>
                            <p className="text-gray-600">Expiration Date: {new Date(request.expirationDate).toLocaleString()}</p>
                            <p className="text-gray-600">Notes: {request.additionalNotes}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">You have no food requests yet.</div>
            )}
        </div>
    );
};

export default MyFoodRequest;
