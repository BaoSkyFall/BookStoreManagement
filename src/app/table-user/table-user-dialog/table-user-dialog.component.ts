import { Component,OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../users';
import { UserService } from '../../service/user.service';
import { NoficationService } from '../../service/nofication.service';


export interface DialogDataTemp {
  isAdd: boolean;
}
@Component({
  selector: 'app-table-user-dialog',
  templateUrl: './table-user-dialog.component.html',
  styleUrls: ['./table-user-dialog.component.css']
})

export class TableUserDialogComponent {

 
  public isAdd: boolean
  

  public link_avatar_ts: string = "";
roles = [
  { id: 1, value: "Admin" },
  { id: 2, value: "Staff" }
];
chucvu = [
  { value: "Quản Lý" },
  { value: "Nhân Viên" },
]
constructor(private service: UserService, private nofication: NoficationService,
  public dialogRef: MatDialogRef<any>,
  @Inject(MAT_DIALOG_DATA) public data: DialogDataTemp) {
      this.isAdd= data.isAdd
  }

  ngOnInit() {

  }
  onClear() {
    this.service.form.reset();
  }
  onSubmit() {
    if(this.isAdd)
    {
      console.log(this.service.form.value);
      this.service.AddnewUers(this.service.form);
      this.nofication.success(':: Submitted successfully');
      this.onClose();
    }
    else
    {
      console.log(this.isAdd);
      console.log(this.service.form.value);
      this.service.UpdateUser(this.service.form);
      this.nofication.success(':: Submitted successfully');
      this.onClose();
    }
    

  }
  onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }
}
