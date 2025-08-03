import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { IUser } from "../../../data/interfaces/user.interface";

interface DialogData {
  user: IUser;
}

@Component({
  selector: "app-create-edit-user",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: "./create-edit-user.component.html",
  styleUrl: "./create-edit-user.component.scss"
})
export class CreateEditUserComponent {
  private readonly fb = inject(FormBuilder);
  public readonly dialog = inject(MatDialog);

  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  public readonly data: DialogData = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    phone: ["", Validators.required],
    email: ["", Validators.required],
    company: this.fb.group({
      name: ["", Validators.required]
    }),
    website: ["", Validators.required]
  });

  ngOnInit() {
    if (this.data?.user) {
      this.form.patchValue(this.data.user);
    }
  }

  saveUser() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.getRawValue());
  }
}
