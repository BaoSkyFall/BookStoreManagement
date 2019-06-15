import { Component, OnInit,ViewChild } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import {HttpClient} from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator,MatIcon } from '@angular/material';
import { IInvoice_Bought } from '../invoice_bought';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-invoice-bought',
  templateUrl: './invoice-bought.component.html',
  styleUrls: ['./invoice-bought.component.css']
})
export class InvoiceBoughtComponent implements OnInit {
  public invoices = [];
  constructor(private _invoiceService: InvoiceService, private http: HttpClient) { };
  listData = new MatTableDataSource<IInvoice_Bought>();
  displayedColumns: string[] = ['mahd', 'macongty', 'manv', 'ngaymua', 'sotienmua','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string = "";

    public tableData1: TableData;
        public delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
    ngOnInit(){
      this._invoiceService.getallboughtInvoice().subscribe(data =>{
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
         this.delay(300).then(any=>{
             console.log(this.invoices);
             this.tableData1 = {
              headerRow: ['','Ma Hoa Don', 'Ma Cong Ty Mua', 'Ma Nhan Vien GD', 'Ngay Mua', 'So Tien Mua','Option'],
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
