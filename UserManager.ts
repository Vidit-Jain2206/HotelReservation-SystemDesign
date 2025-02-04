import { Reservation } from "./Reservation";
import { User } from "./User";

export class UserManager {
  private users: User[];
  private static instance: UserManager;
  constructor() {
    this.users = [];
  }

  public static getInstance(): UserManager {
    if (!this.instance) {
      this.instance = new UserManager();
    }
    return this.instance;
  }

  public addUser(name: string, email: string, phone: string): User {
    const user = new User(name, email, phone);
    this.users.push(user);
    return user;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((user) => user.getId() === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.getEmail() === email);
  }

  public getUserByPhone(phone: string): User | undefined {
    return this.users.find((user) => user.getPhone() === phone);
  }

  public getUserByName(name: string): User | undefined {
    return this.users.find((user) => user.getName() === name);
  }
  public getAllUserReservation(userId: string): Reservation[] {
    const user = this.getUserById(userId);
    if (!user) {
      console.log("User not found");
      return [];
    }
    return user.getReservations();
  }
}
