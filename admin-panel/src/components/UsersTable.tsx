"use client";

import React, { useState, useEffect } from "react";
import { User } from "../models/User";
import { Report } from "../models/Report";
import UserController from "../controllers/UserController";

export default function UsersTable()
{
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const userController = new UserController();

  useEffect(() =>
  {
    const fetchUsers = async () =>
    {
      try
      {
        const data = await userController.getUsers();
        setUsers(data);
      } catch (err)
      {
        setError('Failed to fetch users');
        console.error(err);
      } finally
      {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleBanStatus = async (userId: number) =>
  {
    try
    {
      const updatedUser = await userController.toggleBanStatus(userId);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
    } catch (err)
    {
      setError('Failed to update user status');
      console.error(err);
    }
  };

  const viewReports = async (userId: number) =>
  {
    try
    {
      const reports = await userController.getUserReports(userId);
      setUserReports(reports);
      setSelectedUser(userId);
      setShowReportsModal(true);
    } catch (err)
    {
      setError('Failed to fetch user reports');
      console.error(err);
    }
  };

  if (loading) return <div className="w-full text-center py-10">Loading...</div>;
  if (error) return <div className="w-full text-center py-10 text-red-500">Error: {error}</div>;

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
            {paginatedUsers.map((user) => (
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
                    className={`${user.isBanned
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                      } text-white px-3 py-1 rounded-md mr-2 transition-colors duration-200 cursor-pointer`}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() =>
                    {
                      setEditingUser({ ...user });
                      setShowEditModal(true);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md mr-2 transition-colors duration-200 cursor-pointer"
                  >
                    Edit
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

      {/* Row Selection UI */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
          <select
            className="border border-gray-300 rounded-md px-2 py-1 text-sm cursor-pointer"
            value={rowsPerPage}
            onChange={(e) =>
            {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing row count
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={users.length}>All</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-4">
            {users.length > 0 ? `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, users.length)} of ${users.length}` : '0 results'}
          </span>
          <button
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
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
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              >
                ✖
              </button>
            </div>

            {userReports.length > 0 ? (
              <div className="space-y-4">
                {userReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-500">
                      Report #{report.id} • {
                        new Date(report.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })
                      }
                    </p>
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              >
                ✖
              </button>
            </div>

            // In UsersTable.tsx, replace the current form onSubmit handler:

            // Replace the edit form portion in UsersTable.tsx
            <form onSubmit={async (e) =>
            {
              e.preventDefault();
              if (editingUser)
              {
                try
                {
                  // Update in Firestore via controller
                  await userController.updateUser(editingUser);

                  // Update local state
                  setUsers(prevUsers =>
                    prevUsers.map(u => u.id === editingUser.id ? editingUser : u)
                  );

                  setShowEditModal(false);
                } catch (err)
                {
                  console.error("Error updating user:", err);
                  alert("Failed to update user. Please try again.");
                }
              }
            }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reset Password
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 cursor-pointer"
                    onClick={() =>
                    {
                      // Password reset logic would go here
                      alert("Password reset email sent to user");
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}