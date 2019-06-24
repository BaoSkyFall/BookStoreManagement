import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatIcon, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { IInvoice_Bought } from '../invoice_bought';

import { NoficationService } from '../service/nofication.service';
import { InvoiceBouthgtBoughtDialogComponent } from './invoice-bouthgt-bought-dialog/invoice-bouthgt-bought-dialog.component';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-invoice-bought',
  templateUrl: './invoice-bought.component.html',
  styleUrls: ['./invoice-bought.component.css']
})
export class InvoiceBoughtComponent implements OnInit {
  public invoices = [];
  constructor(private _invoiceService: InvoiceService, private nofication: NoficationService, private http: HttpClient, private dialog: MatDialog) { };
  listData = new MatTableDataSource<IInvoice_Bought>();
  displayedColumns: string[] = ['mahd', 'macongty', 'ngaymua', 'sotienmua', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string = "";
  loadData() {
    this._invoiceService.getallboughtInvoice().subscribe(data => {
      console.log(data);
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }
  ngOnInit() {
    this.loadData();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    console.log(this.searchKey);
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    this._invoiceService.items = this._invoiceService.bought_form.get('items') as FormArray;
    this._invoiceService.items.push(this._invoiceService.createItem([]));
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    
  
    
    dialogConfig.data = {

      isAdd: true,
      mahd: '',
      macongty: 'CONGTY01',
      tongtien: 0,
    };
    const dialogRef = this.dialog.open(InvoiceBouthgtBoughtDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (result) {
        this.loadData();
      }
    });
  }
  onEdit(mahd, macongty, sotien) {
    this._invoiceService.getdetailboughtInvoice(mahd).subscribe(data => {
      console.log(data);
      this._invoiceService.populateForm_bought(mahd, macongty, sotien, data);
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      
      dialogConfig.data = {

        isAdd: false,
        mahd: mahd,
        macongty: macongty,
        tongtien: sotien
      };
      const dialogRef = this.dialog.open(InvoiceBouthgtBoughtDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        if (result) {
          this.loadData();
        }
      });
    })

    // console.log(mahd,macongty);
    // const dialogConfig = new MatDialogConfig();

    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     dialogConfig.width = "60%";
    //     dialogConfig.data = {

    //         isAdd: true
    //     };
    //     const dialogRef = this.dialog.open(InvoiceBouthgtBoughtDialogComponent, dialogConfig);


    //     dialogRef.afterClosed().subscribe(result => {
    //         // console.log('The dialog was closed');
    //         if (result) {
    //             this.loadData();
    //         }
    //     });
  }
  onDelete(id)
  {
    this._invoiceService.deleteInvoice(id).subscribe(res=>{
      if(res== "Delete successfull")
      {
        this.nofication.success(':: Delete Successfully');
        this.loadData();
      
      }
      //you can do asomething, like
      else
      {
      console.log(res);
        
        this.nofication.warn(':: Can not Delete your Invoice')

      }
    },err=>{
      console.log(err);
      this.nofication.warn(':: Can not Delete your Invoice')

    })
  }
}
