import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../service/user.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoficationService } from '../../service/nofication.service';
import { InvoiceService } from '../../service/invoice.service';
import { FormArray } from '@angular/forms';

export interface DialogDataTemp {
  isAdd: boolean;
  mahd: string;
  macongty: string;
  tongtien: number
}
@Component({
  selector: 'app-invoice-bouthgt-bought-dialog',
  templateUrl: './invoice-bouthgt-bought-dialog.component.html',
  styleUrls: ['./invoice-bouthgt-bought-dialog.component.css']
})

export class InvoiceBouthgtBoughtDialogComponent implements OnInit {
  isAdd: boolean;
  mahd: string;
  macongty: string;
  tongtien: number;
  tencongty = [
    { name: "Công Ty Cổ Phần Tập Đoàn FLC", value: "CONGTY01" },
    { name: "Công Ty Cổ Phần Tập Đoàn KFC", value: "CONGTY02" },
    { name: "Công ty cổ phần Hạ tầng Viễn thông CMC Telecom", value: "CONGTY03" },
    { name: "Công ty Cổ phần CCGroup Toàn Cầu", value: "CONGTY04" },


  ];
  tensach = [
    { name: "Code Dạo Kí Sự - Lập Trình Viên Đâu Phải Chỉ Biết Code", value: "SACH01" },
    { name: "FASFAS", value: "SACH02" },
    { name: "Kẻ Trộm Sách (Tái Bản)", value: "SACH03" },
    { name: "Bạn Đắt Giá Bao Nhiêu?", value: "SACH04" },
    { name: "Đắc Nhân Tâm (Khổ Lớn)", value: "SACH05" },
    { name: "Hành Trình Về Phương Đông (Tái Bản)", value: "SACH06" },
    { name: "Nhà Giả Kim", value: "SACH07" },
    { name: "Thám Tử Lừng Danh Conan - Tập 95", value: "SACH08" },
    { name: "Tony Buổi Sáng - Trên Đường Băng (Tái Bản 2017)", value: "SACH09" },
    { name: "Code Dạo Kí Sự - Lập Trình Viên Đâu Phải Chỉ Biết Code", value: "SACH10" },
  ]
  constructor(private service: InvoiceService, private nofication: NoficationService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTemp) {
    this.isAdd = data.isAdd
    this.mahd = data.mahd
    this.macongty = data.macongty
    this.tongtien = data.tongtien
  }

  ngOnInit() {
  }
  onClose() {
    this.service.bought_form.reset();
    this.service.clearFormArray(this.service.items);
    // this.service.items.push(this.service.createItem([]));
    this.dialogRef.close(true);

  }
  onAddButtonClick() {

    this.service.items.push(this.service.createItem([]))
  }
  tinhTien() {
    // console.log(this.service.items.value);
    this.tongtien = 0;
    this.service.items.value.forEach(element => {
      this.tongtien = this.tongtien + element.quanity * element.price;
    });

  }
  onSubmit() {
    if (this.isAdd) {
      console.log(this.service.bought_form);
      this.service.addnewboughtInvoice(this.service.bought_form).subscribe(res => {
        //here you received the response of your post
        console.log(res);

        if (res == "Add Successfull") {
          this.service.addnewboughtInvoiceDetail(this.service.bought_form).subscribe(res => {
            if (res == "Add Successfull") {
              this.nofication.success(':: Add Successfully');
              this.onClose();
            }
            else {
              this.nofication.warn(':: Error! Check your input is valid')

            }
          }, err => {
            this.nofication.warn(':: Error! Check your input is valid')

          })

        }
        //you can do asomething, like
        else {
          this.nofication.warn(':: Error! Check your input is valid')

        }

      }, err => {
        console.log(err);
        this.nofication.warn(':: Error! Check your input is valid')

      });

    }
    else {
      console.log(this.service.bought_form.value);
      this.service.updateboughtInvoiceDetail(this.service.bought_form).subscribe(res => {
        //here you received the response of your post
        if (res == "Update Successfull") {
          this.service.updateboughtInvoiceDetailClear(this.service.bought_form).subscribe(res => {
            if (res === "Update Successfull") {
              console.log(res);
              this.nofication.success(':: Update Successfully');
              this.onClose();
            }
            else {
              console.log(res);
              this.nofication.warn(':: Error! Check your input is valid')

            }

          }, err => {
            console.log(err);
            this.nofication.warn(':: Error! Check your input is valid')

          }
          )

        }
        //you can do asomething, like
        else {
       

          this.nofication.warn(':: Error! Check your input is valid')

        }

      }, err => {
        console.log(err);
        this.nofication.warn(':: Error! Check your input is valid')

      });

    }


  }
}
