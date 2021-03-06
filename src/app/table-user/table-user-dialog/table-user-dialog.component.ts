import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../users';
import { UserService } from '../../service/user.service';
import { NoficationService } from '../../service/nofication.service';


export interface DialogDataTemp {
  isAdd: boolean;
  link_avatar:string;
}
@Component({
  selector: 'app-table-user-dialog',
  templateUrl: './table-user-dialog.component.html',
  styleUrls: ['./table-user-dialog.component.css']
})

export class TableUserDialogComponent {


  isAdd: boolean


  public link_avatar: string = "";
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
    this.isAdd = data.isAdd
    this.link_avatar= data.link_avatar
  }

  ngOnInit() {

  }
  onClear() {
    this.service.form.reset();
  }
  onSubmit() {
    if (this.isAdd) {
      this.service.AddnewUers(this.service.form).subscribe(res => {
        //here you received the response of your post
        console.log(res);
        if(res== "Add successfull")
        {
          this.nofication.success(':: Submitted successfully');
          this.onClose();
        }
        //you can do asomething, like
        else
        {
          this.nofication.warn(':: Error! Check your input is valid')

        }
      }, err =>{
        this.nofication.warn(':: Error! Check your input is valid')

        
      });
   
    }
    else {
      console.log(this.isAdd);
      console.log(this.service.form.value);
      this.service.UpdateUser(this.service.form).subscribe(res=>{
        //here you received the response of your post
        if(res== "Update successfull")
        {
          this.nofication.success(':: Update successfully');
          this.onClose();
        }
        //you can do asomething, like
        else
        {
          this.nofication.warn(':: Error! Check your input is valid')
 
        }
   
      },err =>{
        console.log(err);
        this.nofication.warn(':: Error! Check your input is valid')
        
      });
  
    }


  }
  onClose() {
    this.service.form.reset();
    this.dialogRef.close(true);

  }
}
