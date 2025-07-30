import { Component, inject, Input } from "@angular/core";
import { UserCardComponent } from "../user-card/user-card.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { UsersService } from "../../data/services/users-service";
import { AsyncPipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";
import { IUser } from "../../data/interfaces/user.interface";
import { LocalStorageService } from "../../data/services/local-storage.service";

@Component({
  selector: "app-users-list",
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss",
})
export class UsersListComponent {
  @Input() user!: IUser;

  readonly dialog = inject(MatDialog);

  readonly usersService = inject(UsersService);

  public localStorage = inject(LocalStorageService);

  addUser() {
    this.dialog
      .open(CreateEditUserComponent)
      .afterClosed()
      .subscribe((newUser: IUser) => {
        if (newUser) this.usersService.createUser(newUser);
      });
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id!);
  }

  onEditUser(user: IUser) {
    this.usersService.editUser(user);
  }
}
