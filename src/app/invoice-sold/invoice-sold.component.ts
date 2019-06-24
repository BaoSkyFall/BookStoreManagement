import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatIcon, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { IInvoice_Sold } from '../invoice_sold';
import { NoficationService } from '../service/nofication.service';

import { FormArray } from '@angular/forms';
import { InvoiceSoldDialogComponent } from './invoice-sold-dialog/invoice-sold-dialog.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-invoice-sold',
  templateUrl: './invoice-sold.component.html',
  styleUrls: ['./invoice-sold.component.css']
})
export class InvoiceSoldComponent implements OnInit {

  public invoices = [];
  constructor(private _invoiceService: InvoiceService, private nofication: NoficationService, private http: HttpClient, private dialog: MatDialog) { };
  listData = new MatTableDataSource<IInvoice_Sold>();
  displayedColumns: string[] = ['mahd', 'makh', 'manv', 'ngayban', 'sotienban','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string = "";

  public tableData1: TableData;
  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  loadData()
  {
    this._invoiceService.getallsoldInvoice().subscribe(data => {
      console.log(data);
      this.invoices = data;

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
    this._invoiceService.items = this._invoiceService.sold_form.get('items') as FormArray;
    this._invoiceService.items.push(this._invoiceService.createItem([]));
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    
  
    
    dialogConfig.data = {

      isAdd: true,
      mahd: '',
      makh: 'KHACHHANG01',
      tongtien: 0,
    };
    const dialogRef = this.dialog.open(InvoiceSoldDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (result) {
        this.loadData();
      }
    });
  }
  onEdit(mahd, makh, sotien) {
    this._invoiceService.getdetailsoldInvoice(mahd).subscribe(data => {
      console.log(data);
      this._invoiceService.populateForm_sold(mahd, makh, sotien, data);
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      
      dialogConfig.data = {

        isAdd: false,
        mahd: mahd,
        makh: makh,
        tongtien: sotien
      };
      const dialogRef = this.dialog.open(InvoiceSoldDialogComponent, dialogConfig);
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
    this._invoiceService.deleteInvoiceSold(id).subscribe(res=>{
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
