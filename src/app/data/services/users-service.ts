import { BehaviorSubject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public usersSubject = new BehaviorSubject<IUser[]>([])
  public usersApiService = inject(UsersApiService)
  public localStorage = inject(LocalStorageService)


  private saveToStorage() {
    this.localStorage.setItem('users', JSON.stringify(this.usersSubject.value))
  }


  loadUsers() {
    this.usersApiService.getUsers().subscribe(users => {
      this.usersSubject.next(users);
      this.localStorage.setItem('users', JSON.stringify(users))
    })
  }

  updateUsers(users: IUser[]) {
    this.usersSubject.next(users)
  }

  deleteUser(id: number) {
    this.usersSubject.next(this.usersSubject.value.filter(user => user.id !== id))
    this.saveToStorage();
  }

  editUser(data: IUser) {
    this.usersSubject.next(this.usersSubject.value.map((user) => user.id === data.id ? data : user))
    this.saveToStorage();
  }

  createUser(user: IUser) {
    const maxId = Math.max(0, ...this.usersSubject.value.map(u => u.id || 0));
    this.usersSubject.next([...this.usersSubject.value, { ...user, id: maxId + 1 }])
    this.saveToStorage();
  }

}
