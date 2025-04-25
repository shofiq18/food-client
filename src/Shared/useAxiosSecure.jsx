

import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Use local backend for testing
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            response => response,
            async error => {
                console.log('Error caught in interceptors:', error);

                const isPublicEndpoint = error.config?.url?.includes('/newsletter-subscribe') ||
                    error.config?.url?.includes('/available-foods') ||
                    error.config?.url?.includes('/featured-foods');
                if (isPublicEndpoint) {
                    return Promise.reject(error);
                }

                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    console.log('Unauthorized or Forbidden access, logging out the user');
                    try {
                        await logOut();
                        console.log('User logged out successfully');
                        navigate('/login', { state: { from: location.pathname } });
                    } catch (logoutError) {
                        console.error('Error during logout:', logoutError);
                        navigate('/login', { state: { from: location.pathname } });
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [logOut, navigate, location.pathname]);

    return axiosInstance;
};

export default useAxiosSecure;