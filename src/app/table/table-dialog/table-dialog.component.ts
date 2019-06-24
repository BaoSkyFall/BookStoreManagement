import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../users';
import { NoficationService } from '../../service/nofication.service';
import { BooksService } from '../../service/books.service';
export interface DialogDataTemp {
  isAdd: boolean;
  link_anhbia:string;
  link_anhsau:string;
  link_trangdau:string;
}
@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent implements OnInit {
   isAdd: boolean;
   link_anhbia:string;
   link_anhsau:string;
   link_trangdau:string;
  constructor(private service: BooksService, private nofication: NoficationService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTemp) {
    this.isAdd = data.isAdd;
    this.link_anhbia = data.link_anhbia;
    this.link_anhsau = data.link_anhsau;
    this.link_trangdau = data.link_trangdau;
  }
  theloai = [
    { id: 1, value: "Sách Khoa Học & Kỹ Thuật" },
    { id: 2, value: "Sách Kiến Thức Tổng Hợp" },
    { id: 3, value: "Sách Văn Học" },
    { id:4, value: "Sách Kỹ Năng Sống" },
    { id: 5, value: "Truyện Tranh Manga, Comic" },

    

  ];
  ngOnInit() {

  }
  onClear() {
    this.service.form.reset();
  }
  onSubmit() {
    if (this.isAdd) {
      this.service.addNewBook(this.service.form).subscribe(res => {
        //here you received the response of your post
        console.log(res);
        if(res== "Add Successfull")
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
      this.service.updateBook(this.service.form).subscribe(res=>{
        //here you received the response of your post
        if(res== "Update Successfull")
        {
          this.nofication.success(':: Update Successfully');
          this.onClose();
        }
        //you can do asomething, like
        else
        {
          console.log(res);
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
