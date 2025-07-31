import { Component, EventEmitter, Input, Output, inject } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

import { IUser } from "../../data/interfaces/user.interface";

import { CreateEditUserComponent } from "../users-list/create-edit-user/create-edit-user.component";

@Component({
  selector: "app-user-card",
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.scss"
})
export class UserCardComponent {
  @Input() user!: IUser;

  @Output() onDeleteUser = new EventEmitter<number>();

  @Output() onEditUser = new EventEmitter<IUser>();

  readonly dialog = inject(MatDialog);

  openEditUserDialog(): void {
    this.dialog
      .open(CreateEditUserComponent, { data: { user: this.user } })
      .afterClosed()
      .subscribe((user: IUser | undefined) => {
        if (user) this.onEditUser.emit({ ...user, id: this.user.id });
      });
  }

  deleteUser(id: number) {
    this.onDeleteUser.emit(id);
  }
}
