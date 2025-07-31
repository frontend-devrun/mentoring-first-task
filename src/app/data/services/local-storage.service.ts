import { Injectable } from "@angular/core";

import { IUser } from "../interfaces/user.interface";

interface ILocalStorageService {
  setItem(key: string, value: IUser[]): void;
  getItem(key: string): IUser[];
}

@Injectable({
  providedIn: "root"
})
export class LocalStorageService implements ILocalStorageService {
  public setItem(key: string, value: IUser[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): IUser[] {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }
}
