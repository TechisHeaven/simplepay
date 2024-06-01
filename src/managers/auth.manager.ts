import { UserInterface } from "../types/types.user";

export class UserManager {
  private user: UserInterface[] = [];
  constructor() {
    this.user = this.user;
  }

  createUser(user: UserInterface) {
    this.user.push(user);
    return user;
  }

  getUserByEmail(email: string) {
    return this.user.find((user) => user.email === email);
  }

  getUserBySearch(search: string) {
    console.log(this.user);
    return this.user.find((user) => user.id!);
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
