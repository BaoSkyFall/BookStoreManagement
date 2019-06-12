import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice_Bought } from '../invoice_bought';
import { Observable } from 'rxjs';
import { IInvoice_Sold } from '../invoice_sold';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getallboughtInvoice(): Observable<IInvoice_Bought[]> {
    {
      return this.http.get<IInvoice_Bought[]>("http://localhost:3000/api/tatcahoadonmua");
    }
  }
  getallsoldInvoice(): Observable<IInvoice_Sold[]> {
    {
      return this.http.get<IInvoice_Sold[]>("http://localhost:3000/api/tatcahoadonban");
    }
  }
}



