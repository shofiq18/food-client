import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://assignment-11-server-nine-chi.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error uncaught in interceptors', error);
            if (error.status === 401 || error.status === 403) {
                console.log('need to logout the user ')
                logOut()
                .then(() => {
                    console.log('logout the user')
                    navigate('/login')
                })
                .catch(error => console.log(error));
                
            }
            return Promise.reject(error);
        })
         
        
    }, [])

    return axiosInstance;
   
};

export default useAxiosSecure;