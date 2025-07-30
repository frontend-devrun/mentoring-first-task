import { inject, Injectable } from "@angular/core";
import { UsersService } from "./users-service";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  public readonly usersService = inject(UsersService);

  constructor() {
    let users = this.getItem("users");

    if (users.length > 0) {
      this.usersService.usersSubject.next(users);
    } else {
      this.usersService.loadUsers();
    }

    this.usersService.users$.subscribe((res) => {
      this.setItem("users", res);
    });
  }

  private setItem(key: string, value: IUser[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getItem(key: string): IUser[] {
    return JSON.parse(localStorage.getItem(key) ?? "");
  }
}
