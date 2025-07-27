import { Component, inject, Input, OnInit } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../data/services/users-service';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { IUser } from '../../data/interfaces/user.interface';
import { LocalStorageService } from '../../data/services/local-storage.service';
import { decrement, increment, reset } from '../../store/users/user.actions';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})

export class UsersListComponent implements OnInit {

  @Input() user!: IUser

  readonly dialog = inject(MatDialog);
  readonly usersService = inject(UsersService)
  public localStorage = inject(LocalStorageService)

  public store = inject(Store);

  public count$ = this.store.select('count');


  ngOnInit() {
    let users = JSON.parse(this.localStorage.getItem('users')!)

    if (users.length === 0 || !users) {
      this.usersService.loadUsers();
    }
    this.usersService.updateUsers(users)
  }


  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }



  addUser() {
    this.dialog.open(CreateEditUserComponent)
      .afterClosed()
      .subscribe((newUser: IUser) => {
        if (newUser)
          this.usersService.createUser(newUser)
      });
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id!)
  }

  onEditUser(user: IUser) {
    this.usersService.editUser(user)
  }

}
