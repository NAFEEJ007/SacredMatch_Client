import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            axios.get(`${import.meta.env.VITE_API_URL}/users/admin/${user.email}`, { withCredentials: true })
                .then(res => {
                    if (res.data.admin) {
                        navigate('/dashboard/admin-home', { replace: true });
                    } else {
                        navigate('/', { replace: true });
                    }
                })
        }
    }, [user, loading, navigate]);

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: 'normal', // Default role
                            premium: false
                        }
                        axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                            .then(res => {
                                if (res.data.insertedId || res.data.message === 'user already exists') {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    // navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
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
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'normal',
                    premium: false
                }
                axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                    .then(res => {
                        console.log(res.data);
                        // navigate('/');
                    })
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                name="name"
                                placeholder="Name"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            {errors.name && <span className="text-red-600 text-sm">Name is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                name="email"
                                placeholder="Email address"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                                name="password"
                                placeholder="Password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            {errors.password?.type === 'required' && <span className="text-red-600 text-sm">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600 text-sm">Password must be 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-600 text-sm">Password must be less than 20 characters</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photoURL" className="sr-only">Photo URL</label>
                            <input
                                type="text"
                                {...register("photoURL", { required: true })}
                                placeholder="Photo URL"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            {errors.photoURL && <span className="text-red-600 text-sm">Photo URL is required</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
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
                        <div className="mt-4 text-center">
                            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-500">
                                Login as Admin
                            </Link>
                            <button
                                type="button"
                                onClick={() => {
                                    setValue("name", "Super Admin");
                                    setValue("email", "admin@gmail.com");
                                    setValue("password", "123456");
                                    setValue("photoURL", "https://i.ibb.co/4pDNDk1/avatar.png");
                                }}
                                className="block w-full mt-2 text-sm text-blue-600 hover:underline"
                            >
                                Fill Admin Info (Register First)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
