import { Component, OnInit } from '@angular/core';
import { IUser } from '../../users';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-table-user-dialog',
  templateUrl: './table-user-dialog.component.html',
  styleUrls: ['./table-user-dialog.component.css']
})
export class TableUserDialogComponent implements OnInit {

  link_avatar:string = "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2019/03/avatar-publicity_still-h_2019.jpg";
  roles = [
  {id:1, value: "Admin"},
  {id:2,value:"User"}
];
chucvu = [
  {value: "Quan Ly"},
  {value:"Nhan Vien"},
]
constructor(private service: UserService) { }

ngOnInit() {
}
onClear()
{
  this.service.form.reset();
}
onSubmit()
{
  console.log(this.service.form.value);
  this.service.AddnewUers(this.service.form);
}

}
