

import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    
    
    if(loading ){
        return <Loading></Loading>
    }
    if(user && user?. email) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>


};

export default PrivateRoute;