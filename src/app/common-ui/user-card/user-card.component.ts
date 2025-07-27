import { Component, Input, EventEmitter, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../data/interfaces/user.interface';
import { CreateEditUserComponent } from '../users-list/create-edit-user/create-edit-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})

export class UserCardComponent {

  @Input() user!: IUser
  @Output() onDeleteUser = new EventEmitter<number>()
  @Output() onEditUser = new EventEmitter<IUser>()

  readonly dialog = inject(MatDialog)

  openEditUserDialog(): void {
    this.dialog.open(CreateEditUserComponent, {
      data: { user: this.user },
    }).afterClosed().subscribe(user => {
      if (user)
        this.onEditUser.emit({ ...user, id: this.user.id })
    });
  }

  deleteUser(id: number) {
    this.onDeleteUser.emit(id)
  }

}
