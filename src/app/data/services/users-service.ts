import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { UsersApiService } from "./users-api.service";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  public usersSubject = new BehaviorSubject<IUser[]>([]);
  public usersApiService = inject(UsersApiService);

  public loadUsers(): Subscription {
    return this.usersApiService
      .getUsers()
      .subscribe((users) => this.usersSubject.next(users));
  }

  public get users$(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  public deleteUser(id: number): void {
    this.usersSubject.next(
      this.usersSubject.value.filter((user) => user.id !== id),
    );
  }

  public editUser(data: IUser): void {
    this.usersSubject.next(
      this.usersSubject.value.map((user) =>
        user.id === data.id ? data : user,
      ),
    );
  }

  public createUser(user: IUser): void {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }
}
