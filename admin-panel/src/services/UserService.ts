// c:\dev\The-Daily-Catch\admin-panel\src\services\UserService.ts
import { User } from '../models/User';
import { Report } from '../models/Report';
import { db } from '../config/firebase';
import
{
  collection, getDocs, doc, getDoc, setDoc, updateDoc,
  query, where, DocumentData
} from 'firebase/firestore';

export default class UserService
{
  // Convert Firestore document to User model
  private convertToUser(doc: DocumentData): User
  {
    const data = doc.data();
    return {
      id: parseInt(doc.id),
      username: data.username,
      email: data.email,
      isBanned: data.isBanned,
      reports: data.reports
    };
  }

  async getAllUsers(): Promise<User[]>
  {
    try
    {
      const usersSnapshot = await getDocs(collection(db, "users"));
      return usersSnapshot.docs.map(doc => this.convertToUser(doc));
    } catch (error)
    {
      console.error("Error getting users:", error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User>
  {
    try
    {
      const userDoc = await getDoc(doc(db, "users", id.toString()));
      if (!userDoc.exists())
      {
        throw new Error(`User with id ${id} not found`);
      }
      return this.convertToUser(userDoc);
    } catch (error)
    {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  async updateUser(user: User): Promise<User>
  {
    try
    {
      const userRef = doc(db, "users", user.id.toString());
      await updateDoc(userRef, {
        username: user.username,
        email: user.email,
        isBanned: user.isBanned,
        reports: user.reports
      });
      return user;
    } catch (error)
    {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Add this method to your UserService class:

  async toggleBanStatus(userId: number): Promise<User>
  {
    try
    {
      const user = await this.getUserById(userId);
      const updatedUser = {
        ...user,
        isBanned: !user.isBanned
      };

      await this.updateUser(updatedUser);
      return updatedUser;
    } catch (error)
    {
      console.error("Error toggling ban status:", error);
      throw error;
    }
  }

  async getUserReports(userId: number): Promise<Report[]>
  {
    try
    {
      const reportsQuery = query(
        collection(db, "reports"),
        where("userId", "==", userId)
      );

      const reportsSnapshot = await getDocs(reportsQuery);
      return reportsSnapshot.docs.map(doc =>
      {
        const data = doc.data();
        return {
          id: parseInt(doc.id),
          userId: data.userId,
          message: data.message,
          date: data.date
        };
      });
    } catch (error)
    {
      console.error("Error getting reports:", error);
      throw error;
    }
  }
}