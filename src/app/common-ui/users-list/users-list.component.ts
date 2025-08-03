import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { IUser } from "../../data/interfaces/user.interface";
import { addUser, deleteUser, editUser, loadUsers } from "../../store/users/user.actions";
import { selectUsersError, selectUsersList } from "../../store/users/user.selectors";
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";

@Component({
  selector: "app-users-list",
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss"
})
export class UsersListComponent implements OnInit {
  @Input() user!: IUser;

  readonly dialog = inject(MatDialog);

  private store = inject(Store<{ users: IUser[] }>);

  protected users$ = this.store.select(selectUsersList);
  protected error$ = this.store.select(selectUsersError);

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
  addUser() {
    this.dialog
      .open(CreateEditUserComponent)
      .afterClosed()
      .subscribe((newUser: IUser) => {
        if (newUser) {
          this.store.dispatch(addUser({ user: newUser }));
        }
      });
  }

  onDeleteUser(id: number) {
    this.store.dispatch(deleteUser({ id }));
  }

  onEditUser(user: IUser) {
    this.store.dispatch(editUser({ user }));
  }
}
