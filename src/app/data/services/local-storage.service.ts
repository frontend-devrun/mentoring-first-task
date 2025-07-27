import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value)
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key)
  }

}
