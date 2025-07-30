import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { IUser } from "../../../data/interfaces/user.interface";

type DialogData = { user: IUser };

@Component({
  selector: "app-create-edit-user",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./create-edit-user.component.html",
  styleUrl: "./create-edit-user.component.scss",
})
export class CreateEditUserComponent {
  private readonly fb = inject(FormBuilder);

  public readonly dialog = inject(MatDialog);

  private readonly dialogRef: MatDialogRef<CreateEditUserComponent, IUser> =
    inject(MatDialogRef);

  public readonly data: DialogData = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    phone: ["", Validators.required],
    company: this.fb.group({
      name: ["", Validators.required],
    }),
    address: this.fb.group({
      city: ["", Validators.required],
    }),
    email: ["", Validators.required],

    website: ["", Validators.required],
  });

  ngOnInit() {
    if (this.data?.user) {
      this.form.patchValue(this.data.user);
    }
  }

  saveUser() {
    const result: IUser = {
      ...this.form.value,
      id: new Date().getTime(),
      name: this.form.value.name ?? "",
      username: this.form.value.username ?? "",
      phone: this.form.value.phone ?? "",
      email: this.form.value.email ?? "",
      company: {
        name: this.form.value.company?.name ?? "",
      },
      address: {
        city: this.form.value.address?.city ?? "",
      },
      website: this.form.value.website ?? "",
    };
    this.dialogRef.close(result);
  }
}
