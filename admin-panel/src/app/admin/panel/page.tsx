// src/app/admin/panel/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  displayName?: string;
  lastLogin?: string;
  reports?: number;
}

interface Report {
  id: string;
  userId: string;
  userEmail: string;
  reason: string;
  status: string;
  createdAt: string;
}

export default function AdminPanelPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const userSnapshot = await getDocs(collection(db, "user_roles"));
        const fetchedUsers: User[] = [];
        
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          fetchedUsers.push({
            id: doc.id,
            email: userData.email || 'No Email',
            role: userData.role || 'user',
            status: userData.status || 'active',
            displayName: userData.displayName || userData.email?.split('@')[0] || 'Unknown',
            lastLogin: userData.lastLogin || 'Never',
            reports: userData.reports || 0
          });
        });
        
        setUsers(fetchedUsers);
        
        // Mock reports data (in a real app, you'd fetch this from Firestore)
        const mockReports: Report[] = [
          {
            id: '1',
            userId: 'user123',
            userEmail: 'user1@example.com',
            reason: 'Inappropriate content',
            status: 'pending',
            createdAt: '2023-03-10'
          },
          {
            id: '2',
            userId: 'user456',
            userEmail: 'user2@example.com',
            reason: 'Spam',
            status: 'resolved',
            createdAt: '2023-03-09'
          },
          {
            id: '3',
            userId: 'user789',
            userEmail: 'user3@example.com',
            reason: 'Harassment',
            status: 'pending',
            createdAt: '2023-03-08'
          }
        ];
        
        setReports(mockReports);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBanUser = async (userId: string) => {
    try {
      // In a real implementation, we'd update the user status in Firestore
      // await updateDoc(doc(db, "user_roles", userId), {
      //   status: 'banned'
      // });
      
      console.log(`Banning user: ${userId}`);
      
      // Update local state to reflect the change
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'banned' } : user
      ));
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      // In a real implementation, we'd update the user status in Firestore
      // await updateDoc(doc(db, "user_roles", userId), {
      //   status: 'active'
      // });
      
      console.log(`Unbanning user: ${userId}`);
      
      // Update local state to reflect the change
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      ));
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const handleResolveReport = async (reportId: string) => {
    try {
      console.log(`Resolving report: ${reportId}`);
      
      // Update local state
      setReports(reports.map(report =>
        report.id === reportId ? { ...report, status: 'resolved' } : report
      ));
    } catch (error) {
      console.error("Error resolving report:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'users' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reports
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                              {user.displayName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.reports || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {user.status === 'active' ? (
                            <button 
                              onClick={() => handleBanUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Ban
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleUnbanUser(user.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Unban
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{report.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{report.reason}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{report.createdAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {report.status === 'pending' && (
                            <button 
                              onClick={() => handleResolveReport(report.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Resolve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}