import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="text-center my-8 py-44">
            <h2 className="text-5xl font-bold">Not Found Page</h2>
           <Link to="/"> <button className="btn bg-green-500 mt-6">Back to Home</button></Link>
        </div>
    );
};

export default Error;