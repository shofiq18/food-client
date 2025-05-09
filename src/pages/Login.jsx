
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Reveal from "../animation/Reveal";
import Swal from "sweetalert2";

const Login = () => {
    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    // Get the redirect URL from location.state.from, default to "/foods"
    const from = location.state?.from || "/foods";

    const handleGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in with Google Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Google Sign-In Failed",
                    text: "An error occurred. Please try again.",
                });
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log in Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError({ ...error, login: err.code });
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: err.code || "An error occurred. Please try again.",
                });
            });
    };

    return (
        <Reveal>
            <div
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                className="flex justify-center items-center my-12 login-section"
            >
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="food-card card bg-white lg:w-[500px] py-6 mt-6 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="layout-button input input-bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="layout-button input input-bordered"
                                    required
                                />
                                {error.login && (
                                    <label className="label text-red-500">{error.login}</label>
                                )}

                                <label className="label">
                                    <Link
                                        to={`/reset?email=${encodeURIComponent(email)}`}
                                        className="label-text-alt link link-hover"
                                    >
                                        Forgot password?
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-green-600 text-white hover:bg-gray-700 glow-button glow-green">
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className="text-center">or</p>
                        <div className="form-control mt-4 px-8">
                            <button
                                onClick={handleGoogle}
                                className="btn bg-green-600 text-white hover:bg-gray-700 glow-button glow-green"
                            >
                                <span className="mr-4 text-xl">
                                    <FcGoogle />
                                </span>
                                Login with Google
                            </button>
                        </div>
                        <p className="ml-4 mt-4 text-base text-center">
                            Don't have an Account?{" "}
                            <Link className="text-green-500 font-bold border-b" to="/signup">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

export default Login;