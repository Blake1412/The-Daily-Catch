import { User } from '../models/User';
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
    return this.userService.toggleBanStatus(userId);
  }

  async getUserReports(userId: number)
  {
    return this.userService.getUserReports(userId);
  }

  async updateUser(user: User): Promise<User>
  {
    return this.userService.updateUser(user);
  }

  async getUserById(userId: number): Promise<User>
  {
    return this.userService.getUserById(userId);
  }
}