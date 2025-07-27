import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    CommonModule, MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent {

  private readonly fb = inject(FormBuilder)
  public readonly dialog = inject(MatDialog)

  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  form = this.fb.group(
    {
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      company: this.fb.group({
        name: ['', Validators.required]
      }),
      website: ['', Validators.required]
    }
  )

  ngOnInit() {
    if (this.data?.user) {
      this.form.patchValue(
        {
          ...this.data.user,
          company: { name: this.data.user.company.name }
        });
    }
  }

  editUser() {
    this.dialogRef.close(this.form.value)
  }

  createUser() {
    this.dialogRef.close(this.form.value)
  }
}
