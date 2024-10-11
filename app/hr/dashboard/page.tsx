/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserModel } from '@/models/UserModel';

const Dashboard = () => {
    const [user, setUser] = useState<UserModel | null>(null); // Ganti dengan tipe yang sesuai jika diperlukan
    const [loading, setLoading] = useState(true); // Tambahkan state loading
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get("/api/csrf");
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error("Failed to fetch CSRF token:", error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await axios.post("/api/auth/user");
                const userData = {
                    name: response.data.user.name,
                    email: response.data.user.email,
                };

                // Set user in state
                setUser(userData);

                // Set user in local storage here
                // localStorage.setItem('user', JSON.stringify(userData));
                // console.log(localStorage.getItem('user')); // Verify saved data

            } catch (error) {
                console.error("Failed to fetch user details:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCsrfToken();
        fetchUserDetails();
    }, []);


    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="loader"></div>
            </div>
        );
    }


    return (
        <div className="p-4">
            {user ? (
                <>
                    <h1 className="text-2xl font-bold">Welcome, {user.role === 'hr' ? 'HR' : 'Employee'}</h1>
                    {user.role === 'hr' && (
                        <a href="/employees" className="bg-blue-500 text-white p-2 rounded">Manage Employees</a>
                    )}
                </>
            ) : (
                <h1 className="text-2xl font-bold">Please login to continue</h1>
            )}
        </div>
    );
};

export default Dashboard;
