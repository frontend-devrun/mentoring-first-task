import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { IUser } from "../interfaces/user.interface";

import { UsersApiService } from "./users-api.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);

  public readonly usersApiService = inject(UsersApiService);

  public loadUsers(): void {
    this.usersApiService.getUsers().subscribe((users: IUser[]) => this.usersSubject$.next(users));
  }

  public setUsers(users: IUser[]) {
    this.usersSubject$.next(users);
  }

  public get users$(): Observable<IUser[]> {
    return this.usersSubject$.asObservable();
  }

  public deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter((user: IUser) => user.id !== id));
  }

  public editUser(data: IUser): void {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user: IUser) => (user.id === data.id ? data : user))
    );
  }

  public createUser(user: IUser): void {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
  }
}
