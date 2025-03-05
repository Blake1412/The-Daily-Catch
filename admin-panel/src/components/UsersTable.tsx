"use client";

import React, { useState } from "react";

// Mock data for the example
const mockUsers = [
  { id: 1, username: "user1", email: "user1@example.com", isBanned: false, reports: 2 },
  { id: 2, username: "user2", email: "user2@example.com", isBanned: true, reports: 5 },
  { id: 3, username: "user3", email: "user3@example.com", isBanned: false, reports: 0 },
];

interface Report {
  id: number;
  message: string;
  date: string;
}

const mockReports: Record<number, Report[]> = {
  1: [
    { id: 1, message: "Inappropriate content", date: "2025-02-28" },
    { id: 2, message: "Spam", date: "2025-03-01" },
  ],
  2: [
    { id: 3, message: "Harassment", date: "2025-02-20" },
    { id: 4, message: "Fake account", date: "2025-02-21" },
    { id: 5, message: "Inappropriate behavior", date: "2025-02-22" },
    { id: 6, message: "Threatening language", date: "2025-02-25" },
    { id: 7, message: "Spam messages", date: "2025-03-01" },
  ],
};

export default function UsersTable() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showReportsModal, setShowReportsModal] = useState(false);

  const toggleBanStatus = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, isBanned: !user.isBanned };
        }
        return user;
      })
    );
  };

  const viewReports = (userId: number) => {
    setSelectedUser(userId);
    setShowReportsModal(true);
  };

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
                    className={`${user.isBanned ? 'bg-green-600' : 'bg-red-600'} text-white px-3 py-1 rounded-md mr-2`}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>
                  {user.reports > 0 && (
                    <button
                      onClick={() => viewReports(user.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md"
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
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>
            
            {mockReports[selectedUser]?.length > 0 ? (
              <div className="space-y-4">
                {mockReports[selectedUser].map((report) => (
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
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
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