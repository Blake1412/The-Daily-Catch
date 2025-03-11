import { User } from '../models/User';
import { Report } from '../models/Report';
import UserService from '../services/UserService';

export default class UserController
{
  private userService: UserService;

  constructor()
  {
    this.userService = new UserService();
  }

  async getUsers(): Promise<User[]>
  {
    return this.userService.getAllUsers();
  }

  async toggleBanStatus(userId: number): Promise<User>
  {
    const user = await this.userService.getUserById(userId);
    if (user)
    {
      user.isBanned = !user.isBanned;
      return this.userService.updateUser(user);
    }
    throw new Error(`User with id ${userId} not found`);
  }

  async getUserReports(userId: number): Promise<Report[]>
  {
    return this.userService.getUserReports(userId);
  }
}