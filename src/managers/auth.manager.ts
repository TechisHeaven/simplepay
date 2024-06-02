import { UserInterface } from "../types/types.user";

export class UserManager {
  private static instance: UserManager;
  private user: UserInterface[] = [];
  constructor() {
    this.user = this.user;
  }

  // Method to get or create the singleton instance
  public static getInstance(): UserManager {
    if (!this.instance) {
      this.instance = new UserManager();
    }
    return this.instance;
  }

  createUser(user: UserInterface) {
    this.user.push(user);
    return user;
  }

  getUserByEmail(email: string) {
    return this.user.find((user) => user.email === email);
  }

  getUserById(id: string) {
    return this.user.find((user) => user.id === id);
  }

  getUserBySearch(props: { search?: string; id?: string }) {
    const resultUsers = this.user.filter(
      (user) =>
        user.id!.includes(props.search!) ||
        user.name.toLowerCase().includes(props.search!.toLowerCase())
    );
    return resultUsers.map((resultUser) => ({
      id: resultUser.id,
      name: resultUser.name,
      email: resultUser.email,
      image: resultUser.image,
    }));
  }

  getUser(email: string, password: string) {
    return this.user.filter(
      (user) => user.email === email && user.password === password
    );
  }

  getUserByToken(token: string) {
    return this.user.filter((user) => user.accessToken === token);
  }
}
