import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";


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