import { Injectable } from "@angular/core";

export interface IStorage<T> {
  setItem(key: string, value: T): void;
  getItem(key: string): T;
}

@Injectable({
  providedIn: "root"
})
export class LocalStorageService<T> implements IStorage<T> {
  public setItem(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : <T>[];
  }
}
