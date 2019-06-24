import { Component, OnInit,Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoficationService } from '../../service/nofication.service';
import { InvoiceService } from '../../service/invoice.service';
import { FormArray } from '@angular/forms';
export interface DialogDataTemp {
  isAdd: boolean;
  mahd: string;
  makh: string;
  tongtien: number
}
@Component({
  selector: 'app-invoice-sold-dialog',
  templateUrl: './invoice-sold-dialog.component.html',
  styleUrls: ['./invoice-sold-dialog.component.css']
})
export class InvoiceSoldDialogComponent implements OnInit {
  isAdd: boolean;
  mahd: string;
  makh: string;
  tongtien: number;
  tenkhachhang = [
    { name: "CHỊ: HẠNH", value: "KHACHHANG01" },
    { name: "ANH: THANH", value: "KHACHHANG02" },
    { name: "CHỊ: KIM OANH", value: "KHACHHANG03" },
    { name: "CHỊ: NHUNG", value: "KHACHHANG04" },
    { name: "ANH: TƯỜNG", value: "KHACHHANG04" },
    
 


  ];
  constructor(private service: InvoiceService, private nofication: NoficationService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTemp) {
    this.isAdd = data.isAdd
    this.mahd = data.mahd
    this.makh = data.makh
    this.tongtien = data.tongtien
  }

  ngOnInit() {
  }
  onClose() {
    this.service.sold_form.reset();
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
      console.log(this.service.sold_form);
      this.service.addnewsoldInvoice(this.service.sold_form).subscribe(res => {
        //here you received the response of your post
        console.log(res);

        if (res == "Add Successfull") {
          this.service.addnewsoldInvoiceDetail(this.service.sold_form).subscribe(res => {
            console.log(res);
            
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
      console.log(this.service.sold_form.value);
      this.service.updateboughtInvoiceDetail(this.service.sold_form).subscribe(res => {
        //here you received the response of your post
        if (res == "Update Successfull") {
          this.service.updateboughtInvoiceDetailClear(this.service.sold_form).subscribe(res => {
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
