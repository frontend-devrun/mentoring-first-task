import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersApiService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = "https://jsonplaceholder.typicode.com";

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }
}
