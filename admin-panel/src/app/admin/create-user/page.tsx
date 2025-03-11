// src/app/admin/users/page.tsx - Create a user management page
"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Link from 'next/link';

interface User
{
    id: string;
    username: string;
    email: string;
    isBanned: boolean;
    reports: number;
}

export default function UsersPage()
{
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() =>
    {
        async function fetchUsers()
        {
            try
            {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as User[];

                setUsers(userList);
            } catch (err)
            {
                console.error("Error fetching users:", err);
                setError('Failed to load users. Please try again later.');
            } finally
            {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading)
    {
        return (
            <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error)
    {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <Link
                    href="/admin/create-user"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create User
                </Link>
            </div>

            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-100 font-semibold text-gray-600 uppercase text-sm border-b">ID</th>
                            <th className="py-3 px-4 bg-gray-100 font-semibold text-gray-600 uppercase text-sm border-b">Username</th>
                            <th className="py-3 px-4 bg-gray-100 font-semibold text-gray-600 uppercase text-sm border-b">Email</th>
                            <th className="py-3 px-4 bg-gray-100 font-semibold text-gray-600 uppercase text-sm border-b">Status</th>
                            <th className="py-3 px-4 bg-gray-100 font-semibold text-gray-600 uppercase text-sm border-b">Reports</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-4 px-4 border-b">{user.id}</td>
                                    <td className="py-4 px-4 border-b">{user.username}</td>
                                    <td className="py-4 px-4 border-b">{user.email}</td>
                                    <td className="py-4 px-4 border-b">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.isBanned ? 'Banned' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 border-b">{user.reports}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-4 px-4 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}