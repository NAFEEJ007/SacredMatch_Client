import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
    const { signIn, googleSignIn, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (user && !loading) {
            axios.get(`${import.meta.env.VITE_API_URL}/users/admin/${user.email}`, { withCredentials: true })
                .then(res => {
                    if (res.data.admin) {
                        navigate('/dashboard/admin-home', { replace: true });
                    } else {
                        navigate(from, { replace: true });
                    }
                })
        }
    }, [user, loading, navigate, from]);

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            })
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                // Save user to database if not exists
                // axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                // .then(res => {
                //     console.log(res.data);
                //     navigate(from, { replace: true });
                // })
                // navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-600 text-sm">Password is required</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        New Here? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Create an account</Link>
                    </p>
                    <div className="mt-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">OR</span>
                            </div>
                        </div>
                        <button
                            onClick={handleGoogleSignIn}
                            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FcGoogle className="text-xl" /> Continue with Google
                        </button>
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    setValue("email", "admin@gmail.com");
                                    setValue("password", "123456");
                                }}
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Login as Admin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
