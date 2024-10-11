/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { UserType } from '@/types/user';
import { decryptToken } from '@/lib/jwt';

const Dashboard = () => {
    const [user, setUser] = useState<UserType | undefined>(undefined); // Ganti dengan tipe yang sesuai jika diperlukan
    const [loading, setLoading] = useState(true); // Tambahkan state loading

    useEffect(() => {
        async function fetchData() {
            const encryptedUserData = localStorage.getItem('x-encrypted-user');
            console.log(encryptedUserData);
            if (encryptedUserData) {
                const decryptedUserData = await decryptToken(encryptedUserData);
                setUser(JSON.parse(decryptedUserData));
            }
            setLoading(false);
        }
        fetchData();
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader">Loading...</div> {/* Anda bisa mengganti ini dengan spinner */}
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
