import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator,MatIcon } from '@angular/material';
import { IInvoice_Sold } from '../invoice_sold';

import { FormsModule } from '@angular/forms';

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
  constructor(private _invoiceService: InvoiceService, private http: HttpClient) { };
  listData = new MatTableDataSource<IInvoice_Sold>();
  displayedColumns: string[] = ['mahd', 'makh', 'manv', 'ngayban', 'sotienban','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string = "";

  public tableData1: TableData;
  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  ngOnInit() {
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


    this.delay(300).then(any => {
      console.log(this.invoices);
      console.log(this.listData);

      this.tableData1 = {
        headerRow: ['', 'Ma Hoa Don', 'Ma Khach Hang Mua', 'Ma Nhan Vien GD', 'Ngay Ban', 'So Tien Ban', 'Option'],
        dataRows: [
          ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
          ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
          ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
          ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
          ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
          ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
        ]
      };
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    console.log(this.searchKey);
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }

}
