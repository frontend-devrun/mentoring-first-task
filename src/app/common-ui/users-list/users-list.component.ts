import { AsyncPipe } from "@angular/common";
import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";

import { Subscription } from "rxjs";
import { IUser } from "../../data/interfaces/user.interface";
import { LocalStorageService } from "../../data/services/local-storage.service";
import { UsersService } from "../../data/services/users-service";
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: "app-users-list",
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss"
})
export class UsersListComponent implements OnInit, OnDestroy {
  @Input() user!: IUser;

  readonly dialog = inject(MatDialog);

  readonly usersService = inject(UsersService);

  public localStorageService = inject(LocalStorageService);

  private sub = new Subscription();

  ngOnInit(): void {
    let users = this.localStorageService.getItem("users");

    if (users.length > 0) {
      this.usersService.setUsers(users);
    } else {
      this.usersService.loadUsers();
    }

    this.sub = this.usersService.users$.subscribe((users) => {
      this.localStorageService.setItem("users", users);
    });
  }

  addUser() {
    this.dialog
      .open(CreateEditUserComponent)
      .afterClosed()
      .subscribe((newUser: IUser) => {
        if (newUser) {
          this.usersService.createUser(newUser);
        }
      });
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id!);
  }

  onEditUser(user: IUser) {
    this.usersService.editUser(user);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
