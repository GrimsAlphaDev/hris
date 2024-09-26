/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { UserType } from '@/types/user';

const Dashboard = () => {
    const [user, setUser] = useState<UserType | undefined>(undefined); // Ganti dengan tipe yang sesuai jika diperlukan
    const [loading, setLoading] = useState(true); // Tambahkan state loading

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser: any = jwtDecode(token); // Ambil tipe yang sesuai jika Anda sudah mendeklarasikan tipe
                // convert decodedUser menjadi User
                setUser({
                    userId: decodedUser.userId,
                    role: decodedUser.role,
                    name: decodedUser.name,
                    email: decodedUser.email,
                });
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
        setLoading(false);
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader">Loading...</div> {/* Anda bisa mengganti ini dengan spinner */}
            </div>
        );
    }

    console.log(user);

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
