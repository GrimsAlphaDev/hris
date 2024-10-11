/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from 'react-toastify';


// Skema validasi menggunakan Yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email tidak valid")
        .required("Email diperlukan"),
    password: Yup.string()
        .required("Password diperlukan")
        .min(6, "Password minimal 6 karakter"),
});


export default function Home() {

    const [showPassword, setShowPassword] = useState(false); // State untuk menampilkan password
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // State untuk loader

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get("/api/csrf");
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error("Failed to fetch CSRF token:", error);
            }
        };
        fetchCsrfToken();
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    })


    useEffect(() => {
        toast.info('Use This Credentials For Testing', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
        toast.info('Email : admin@admin.dev', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
        toast.info('Password: admin123', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });


    }, []);


    const onSubmit = async (data: object, e: any) => {
        e.preventDefault();
        setLoading(true);
        // push csrfToken to data
        try {
            const response = await axios.post("/api/auth/login", {
                ...data,
                csrfToken,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // check if response status is 200
            if (response.status === 200) {
                // Redirect to dashboard
                window.location.href = "/hr/dashboard";
            }

        } catch (error: any) {
            console.error("Failed to login:", error);
            // get error message
            const errorMessage = error.response.data.error;
            toast.dismiss();
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } finally {
            setLoading(false); // Nonaktifkan loader setelah selesai
        }
    };

    return (

        <main className="min-h-screen py-6 flex flex-col justify-center sm:py-12 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {/* Overlay dan Loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="loader"></div>
                </div>
            )}
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold dark:text-black">Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                {...register("email")}
                                                id='email'
                                                className={`dark:bg-white bg-dark text-white dark:text-black w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm ${errors.email?.message ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                        <div className="mt-2 flex items-center border border-gray-300 rounded-md overflow-hidden">
                                            <input
                                                type={showPassword ? 'text' : 'password'} // Ubah tipe input berdasarkan state
                                                placeholder='Password'
                                                id='password'
                                                {...register("password")}
                                                className={`dark:bg-white bg-dark text-white dark:text-black w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm ${errors.password?.message ? 'border-red-500' : ''}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)} // Mengubah state showPassword saat diklik
                                                className="px-3 py-2"
                                            >
                                                {showPassword ? (
                                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                                </div>

                                <div className="relative justify-center flex items-center mb-2">
                                    {/* <button type='submit' className="bg-cyan-500 text-white rounded-md px-2 py-1 mt-2" disabled={loading}></button> */}
                                    <button className="p-[3px] relative mt-2 " disabled={loading}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                        {loading ? "Loading..." : "Submit"}
                                        </div>
                                    </button>
                                </div>

                                <p className="text-sm text-center text-gray-600 mt-2 flex content-center justify-center">
                                    <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500 mt-4"><ArrowLeftIcon className='h-5 w-5 inline' /> Back to Home</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}