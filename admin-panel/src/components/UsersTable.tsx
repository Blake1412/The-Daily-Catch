"use client";

import React, { useState, useEffect } from "react";
import { User } from "../models/User";
import { Report } from "../models/Report";
import UserController from "../controllers/UserController";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [userReports, setUserReports] = useState<Report[]>([]);

  const userController = new UserController();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userController.getUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const toggleBanStatus = async (userId: number) => {
    try {
      const updatedUser = await userController.toggleBanStatus(userId);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
    } catch (err) {
      setError('Failed to update user status');
      console.error(err);
    }
  };
  
  const viewReports = async (userId: number) => {
    try {
      const reports = await userController.getUserReports(userId);
      setUserReports(reports);
      setSelectedUser(userId);
      setShowReportsModal(true);
    } catch (err) {
      setError('Failed to fetch user reports');
      console.error(err);
    }
  };

  if (loading) return <div className="w-full text-center py-10">Loading...</div>;
  if (error) return <div className="w-full text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {user.isBanned ? "Banned" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.reports}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleBanStatus(user.id)}
                    className={`${
                      user.isBanned 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    } text-white px-3 py-1 rounded-md mr-2 transition-colors duration-200 cursor-pointer`}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>
                  {user.reports > 0 && (
                    <button
                      onClick={() => viewReports(user.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-200 cursor-pointer"
                    >
                      View Reports
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reports Modal */}
      {showReportsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Reports for {users.find(u => u.id === selectedUser)?.username}
              </h3>
              <button 
                onClick={() => setShowReportsModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                ✖
              </button>
            </div>
            
            {userReports.length > 0 ? (
              <div className="space-y-4">
                {userReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-500">Report #{report.id} • {report.date}</p>
                    <p className="mt-2">{report.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reports found for this user.</p>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowReportsModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}