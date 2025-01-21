"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const LoginRegister = () => {
    // State variables to manage form data
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
    const [registerDetails, setRegisterDetails] = useState({ email: '' });

    useEffect(() => {
        // Check if user is already logged in from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.username || user.email) {
                setIsLoggedIn(true); // If user exists, set logged in state
                setLoginDetails({ username: user.username || '', password: '' });
                setRegisterDetails({ email: user.email || '' });
            }
        }
    }, []); // On component mount

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate a successful login by saving the login details in localStorage
        localStorage.setItem("user", JSON.stringify({ username: loginDetails.username }));
        setIsLoggedIn(true); // Mark the user as logged in
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate a successful registration
        localStorage.setItem("user", JSON.stringify({ email: registerDetails.email }));
        setIsRegistering(true); // Mark the user as registered, and show message to log in
    };

    // Handle input changes for both forms
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterDetails({ ...registerDetails, [name]: value });
    };

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 w-full mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-20 max-[768px]:mt-0">
                {/* Left Section */}
                <div className="space-y-16">
                    {/* Login Form */}
                    {isLoggedIn ? (
                        <div className="text-center">
                            <h2 className="font-bold text-2xl mb-4">You are logged in!</h2>
                            <p>Welcome back, {loginDetails.username || 'Guest'}!</p>
                            <p>Email: {loginDetails.username ? loginDetails.username : 'Not Available'}</p>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleLoginSubmit}>
                            <h1 className="font-bold text-2xl md:text-4xl mb-16">Log In</h1>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-md font-medium mb-4">
                                    Username or email address
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={loginDetails.username}
                                    onChange={handleLoginChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-6 mb-4"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-md font-medium mb-4">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginDetails.password}
                                    onChange={handleLoginChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-6 mb-4"
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="w-[50%] bg-transparent text-black border border-gray-300 rounded-lg py-4 px-4 mb-4 hover:bg-black hover:text-white"
                                >
                                    Login
                                </button>
                                <Link href="#" className="hover:underline">
                                    Lost Your Password?
                                </Link>
                            </div>
                        </form>
                    )}
                </div>

                {/* Right Section */}
                <div>
                    {/* Registration Form */}
                    {isRegistering ? (
                        <div className="text-center">
                            <h2 className="font-bold text-2xl mb-4">Registration Successful</h2>
                            <p>Your registration is complete. Please log in now.</p>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                            <h1 className="font-bold text-2xl md:text-4xl mb-16">Register</h1>
                            <div>
                                <label htmlFor="email" className="block text-md font-medium mb-4">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={registerDetails.email}
                                    onChange={handleRegisterChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-6 mb-4"
                                    required
                                />
                            </div>
                            <p className="text-lg mb-4">
                                A link to set a new password will be sent to your email address.
                            </p>
                            <p className="text-lg mb-8">
                                Your personal data will be used to support your experience throughout this website,
                                to manage access to your account, and for other purposes described in our{' '}
                                <strong>privacy policy.</strong>
                            </p>
                            <button
                                type="submit"
                                className="w-[50%] bg-transparent text-black border border-gray-300 rounded-lg py-4 px-4 mb-8 hover:bg-black hover:text-white"
                            >
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
