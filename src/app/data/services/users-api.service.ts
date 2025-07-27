import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

  http = inject(HttpClient)

  baseUrl = 'https://jsonplaceholder.typicode.com'

  getUsers() {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`)
  }

}
