import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";

import { IUser } from "../interfaces/user.interface";

import { LocalStorageService } from "./local-storage.service";
import { UsersApiService } from "./users-api.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public readonly USERS_LOCAL_STORAGE_KEY: string = "users";

  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);

  public readonly usersApiService = inject(UsersApiService);

  public readonly localStorageService = inject(LocalStorageService);

  public get users$(): Observable<IUser[]> {
    return this.usersSubject$.asObservable();
  }

  private saveToLocalStorage() {
    this.localStorageService.setItem(this.USERS_LOCAL_STORAGE_KEY, this.usersSubject$.getValue());
  }

  private setUsers(users: IUser[]) {
    this.usersSubject$.next(users);
  }

  public getUsers(): Observable<IUser[]> {
    const stored: IUser[] = this.localStorageService.getItem(this.USERS_LOCAL_STORAGE_KEY);

    if (stored?.length) {
      this.setUsers(stored);
      return of(stored);
    } else {
      return this.usersApiService.getUsers().pipe(
        tap((users: IUser[]) => {
          this.setUsers(users);
          this.saveToLocalStorage();
        })
      );
    }
  }
  public deleteUser(id: number): void {
    const filteredUsers = this.usersSubject$.getValue().filter((user: IUser) => user.id !== id);
    this.usersSubject$.next(filteredUsers);
    this.saveToLocalStorage();
  }
  public editUser(data: IUser): void {
    const updatedUsers = this.usersSubject$
      .getValue()
      .map((user: IUser) => (user.id === data.id ? data : user));
    this.usersSubject$.next(updatedUsers);
    this.saveToLocalStorage();
  }

  public createUser(user: IUser): void {
    const usersWithAdded = [...this.usersSubject$.value, user];
    this.usersSubject$.next(usersWithAdded);
    this.saveToLocalStorage();
  }
}
