import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";

import { IUser } from "../interfaces/user.interface";

import { LocalStorageService } from "./local-storage.service";
import { UsersApiService } from "./users-api.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);

  public readonly usersApiService = inject(UsersApiService);

  public readonly localStorageService = inject(LocalStorageService);

  public get users$(): Observable<IUser[]> {
    return this.usersSubject$.asObservable();
  }

  private saveToLocalStorage() {
    this.localStorageService.setItem("users", this.usersSubject$.value);
  }

  public getUsers(): Observable<IUser[]> {
    const stored = this.localStorageService.getItem("users");

    if (stored?.length) {
      this.usersSubject$.next(stored);
      return of(stored);
    } else {
      return this.usersApiService.getUsers().pipe(
        tap((users) => {
          this.usersSubject$.next(users);
          this.saveToLocalStorage();
        })
      );
    }
  }

  public deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter((user: IUser) => user.id !== id));
    this.saveToLocalStorage();
  }

  public editUser(data: IUser): void {
    let current = this.usersSubject$.value;
    this.usersSubject$.next(current.map((user: IUser) => (user.id === data.id ? data : user)));
    this.saveToLocalStorage();
  }

  public createUser(user: IUser): void {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
    this.saveToLocalStorage();
  }
}
