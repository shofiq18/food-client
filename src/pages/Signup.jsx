import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                console.log("Google sign-in successful:", user);
                navigate("/"); 
            })
            .catch((error) => {
                console.error("Error during Google sign-in:", error.message);
                setError({
                    ...error,
                    google: "Failed to sign in with Google. Please try again.",
                });
            });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError({
                ...error,
                password: "Password must be at least 6 characters, contain at least one uppercase letter, and one lowercase letter.",
            });
            return;
        }

        setError({}); 

        try {
            const result = await createNewUser(email, password);
            const user = result.user;
            console.log("User successfully created:", user);

            await updateUserProfile({
                displayName: name,
                photoURL: photo,
            });

            setUser(user);
            e.target.reset();
            navigate("/");
        } catch (err) {
            console.error("Error during registration:", err.message);
            setError({ ...error, general: "Registration failed. Please try again." });
        }
    };

    return (
        <div>
            <div
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                className="flex justify-center items-center my-12"
            >
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
                            Register now!
                        </h1>
                    </div>
                    <div className="card bg-white lg:w-[500px] py-6 mt-6 shadow-2xl">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo-URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="photo-url"
                                    name="photo"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
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
                                    className="input input-bordered"
                                    required
                                />
                                {error.password && (
                                    <label className="label text-red-500">
                                        {error.password}
                                    </label>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-gray-800 text-white hover:bg-gray-700">
                                    Register
                                </button>
                            </div>
                        </form>
                        {error.general && (
                            <p className="text-center text-red-500 mt-4">{error.general}</p>
                        )}
                        <p className="text-center mt-4">or</p>
                        <div className="form-control mt-4 px-8">
                            <button
                                onClick={handleGoogleRegister}
                                className="btn bg-gray-800 text-white hover:bg-gray-700"
                            >
                                <span className="mr-4 text-xl">
                                    <FcGoogle />
                                </span>
                                Login with Google
                            </button>
                        </div>
                        <p className="mt-4 text-base text-center text-gray-600">
                            Already have an Account?{" "}
                            <Link className="text-blue-500 border-b" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
