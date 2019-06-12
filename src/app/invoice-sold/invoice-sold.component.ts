import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import {HttpClient} from '@angular/common/http';declare interface TableData {
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
    constructor(private _invoiceService: InvoiceService, private http: HttpClient){};
    public tableData1: TableData;
        public delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
    ngOnInit(){
      this._invoiceService.getallsoldInvoice().subscribe(data =>{
          console.log(data);
            this.invoices = data;
         });
         this.delay(300).then(any=>{
             console.log(this.invoices);
             this.tableData1 = {
              headerRow: ['','Ma Hoa Don', 'Ma Khach Hang Mua', 'Ma Nhan Vien GD', 'Ngay Ban', 'So Tien Ban','Option'],
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

}
