import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root"
})
export class UsersApiService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = "https://jsonplaceholder.typicode.com";

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }
}
