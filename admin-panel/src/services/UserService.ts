import { User } from '../models/User';
import { Report } from '../models/Report';

// Mock data - in a real app this would come from API
const mockUsers: User[] = [
  { id: 1, username: 'fisher123', email: 'fisher@example.com', isBanned: false, reports: 2 },
  { id: 2, username: 'angler456', email: 'angler@example.com', isBanned: true, reports: 5 },
  { id: 3, username: 'catchmaster', email: 'master@example.com', isBanned: false, reports: 0 },
];

const mockReports: Record<number, Report[]> = {
  1: [
    { id: 1, userId: 1, message: "Posted inappropriate content", date: "2025-01-15" },
    { id: 2, userId: 1, message: "Sharing fake fishing locations", date: "2025-02-20" }
  ],
  2: [
    { id: 3, userId: 2, message: "Harassment in comments", date: "2025-01-10" },
    { id: 4, userId: 2, message: "Spamming fishing forums", date: "2025-01-12" },
    { id: 5, userId: 2, message: "Posting misleading information", date: "2025-02-01" },
    { id: 6, userId: 2, message: "Creating multiple accounts", date: "2025-02-15" },
    { id: 7, userId: 2, message: "Selling items against terms", date: "2025-03-01" }
  ]
};

export default class UserService {
  // Use in-memory data instead of API calls for static export
  async getAllUsers(): Promise<User[]> {
    return Promise.resolve([...mockUsers]);
  }
  
  async getUserById(id: number): Promise<User> {
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return Promise.resolve({...user});
  }
  
  async updateUser(updatedUser: User): Promise<User> {
    const index = mockUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      mockUsers[index] = {...updatedUser};
      return Promise.resolve({...updatedUser});
    }
    throw new Error(`User with id ${updatedUser.id} not found`);
  }
  
  async getUserReports(userId: number): Promise<Report[]> {
    const reports = mockReports[userId] || [];
    return Promise.resolve([...reports]);
  }
}