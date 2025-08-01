import { Injectable } from "@angular/core";

interface ILocalStorageService<T> {
  setItem(key: string, value: T): void;
  getItem(key: string): T;
}

@Injectable({
  providedIn: "root"
})
export class LocalStorageService<T> implements ILocalStorageService<T> {
  public setItem(key: string, value: T = <T>[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : <T>null;
  }
}
