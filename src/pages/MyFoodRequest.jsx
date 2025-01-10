import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../Shared/useAxiosSecure";
import Reveal from "../animation/Reveal";

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/my-requests?email=${user.email}`)
            .then((res) => setRequests(res.data))
            .finally(() => setLoading(false));
    }, [user.email]);

    if (loading) {
        return <div className="text-center py-10">Loading your requests...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Food Requests</h1>

            {requests.length > 0 ? (
                <Reveal>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Food Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Request Date</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Donator</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Pickup Location</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Expiration Date</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request._id}>
                                        <td className="border border-gray-300 px-4 py-2">{request.foodName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(request.requestDate).toLocaleString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.foodDonatorName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.pickupLocation}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(request.expirationDate).toLocaleString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.additionalNotes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            ) : (
                <div className="text-center text-gray-500">You have no food requests yet.</div>
            )}
        </div>
    );
};

export default MyFoodRequest;
