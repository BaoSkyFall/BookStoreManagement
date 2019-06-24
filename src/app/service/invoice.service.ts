import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IInvoice_Bought } from '../invoice_bought';
import { Observable } from 'rxjs';
import { IInvoice_Sold } from '../invoice_sold';
export interface IInvoice_Bought_Detail {
  mahd: string,
  masach: string,
  soluong: number,
  ngaymuaban: string,
  dongia: number
}
export interface IInvoice_Sold_Detail {
  mahd: string,
  masach: string,
  soluong: number,
  ngaymuaban: string,
  dongia: number
}
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  isAdd: boolean = true;
  items: FormArray;
  bought_form = this.formBuilder.group({
    mahd: new FormControl('', Validators.required),
    macongty: new FormControl('', Validators.required),
    items: this.formBuilder.array([]),
    ngaymuaban: new FormControl('', [Validators.required, Validators.minLength(8)]),
    tongtien: new FormControl('', Validators.required),
  })
  sold_form = this.formBuilder.group({
    mahd: new FormControl('', Validators.required),
    makh: new FormControl('', Validators.required),
    items: this.formBuilder.array([]),
    ngaymuaban: new FormControl('', [Validators.required, Validators.minLength(8)]),
    tongtien: new FormControl('', Validators.required),
  })
  getallboughtInvoice(): Observable<IInvoice_Bought[]> {

    return this.http.get<IInvoice_Bought[]>("http://localhost:3000/api/tatcahoadonmua");

  }
  getallsoldInvoice(): Observable<IInvoice_Sold[]> {

    return this.http.get<IInvoice_Sold[]>("http://localhost:3000/api/tatcahoadonban");

  }
  getdetailboughtInvoice(id): Observable<IInvoice_Bought_Detail[]> {
    let url = "http://localhost:3000/api/danhsachmua/" + id;
    return this.http.get<IInvoice_Bought_Detail[]>(url);
  }
  getdetailsoldInvoice(id): Observable<IInvoice_Sold_Detail[]> {
    let url = "http://localhost:3000/api/danhsachban/" + id;
    return this.http.get<IInvoice_Sold_Detail[]>(url);
  }
  addnewboughtInvoice(form: FormGroup) {
    console.log(form.value);
    return this.http.post("http://localhost:3000/api/themhoadonmua", form.value, { responseType: 'text' })
    // console.log(form);
    // let data = form.value;
    // let temp:IInvoice_Bought_Detail[] = [];
    // data.items.forEach(element => {
    //   console.log(element)
    //   temp.push(
    //     {mahd: data.mahd,masach:element.masach,soluong:element.quanity,ngaymuaban:data.ngaymuaban,
    //     dongia: element.price}
    //   )

    // });

    //   return this.http.post("http://localhost:3000/api/themdanhsachmua",temp,{responseType:'text'})


  }
  addnewsoldInvoice(form: FormGroup) {
    console.log(form.value);
    return this.http.post("http://localhost:3000/api/themhoadonban", form.value, { responseType: 'text' })
    // console.log(form);
    // let data = form.value;
    // let temp:IInvoice_Bought_Detail[] = [];
    // data.items.forEach(element => {
    //   console.log(element)
    //   temp.push(
    //     {mahd: data.mahd,masach:element.masach,soluong:element.quanity,ngaymuaban:data.ngaymuaban,
    //     dongia: element.price}
    //   )

    // });

    //   return this.http.post("http://localhost:3000/api/themdanhsachmua",temp,{responseType:'text'})


  }
  addnewboughtInvoiceDetail(form: FormGroup) {
    // console.log(form.value);
    // return this.http.post("http://localhost:3000/api/themhoadonmua",form.value,{responseType:'text'})
    console.log(form);
    let data = form.value;
    let temp: IInvoice_Bought_Detail[] = [];
    data.items.forEach(element => {
      console.log(element)
      temp.push(
        {
          mahd: data.mahd, masach: element.masach, soluong: element.quanity, ngaymuaban: data.ngaymuaban,
          dongia: element.price
        }
      )
    });
    return this.http.post("http://localhost:3000/api/themdanhsachmua", temp, { responseType: 'text' })
  }
  addnewsoldInvoiceDetail(form: FormGroup) {
    // console.log(form.value);
    // return this.http.post("http://localhost:3000/api/themhoadonmua",form.value,{responseType:'text'})
    console.log(form);
    let data = form.value;
    let temp: IInvoice_Sold_Detail[] = [];
    data.items.forEach(element => {
      console.log(element)
      temp.push(
        {
          mahd: data.mahd, masach: element.masach, soluong: element.quanity, ngaymuaban: data.ngaymuaban,
          dongia: element.price
        }
      )
    });
    return this.http.post("http://localhost:3000/api/themdanhsachban", temp, { responseType: 'text' })
  }
  updateboughtInvoiceDetail(form: FormGroup) {
    console.log(form);
    let data = form.value;
    // let temp:IInvoice_Bought_Detail[] = [];
    // data.items.forEach(element => {
    //   console.log(element)
    //   temp.push(
    //     {mahd: data.mahd,masach:element.masach,soluong:element.quanity,ngaymuaban:data.ngaymuaban,
    //     dongia: element.price}
    //   )

    // });
    return this.http.put("http://localhost:3000/api/suahoadonmua", data, { responseType: 'text' })
  }
  updateboughtInvoiceDetailClear(form:FormGroup)
  {
    console.log(form);
    let data = form.value;
    let temp: IInvoice_Bought_Detail[] = [];
    data.items.forEach(element => {
      console.log(element)
      temp.push(
        {
          mahd: data.mahd, masach: element.masach, soluong: element.quanity, ngaymuaban: data.ngaymuaban,
          dongia: element.price
        }
      )
    });
    return this.http.put("http://localhost:3000/api/suachitiethoadonmua", temp, { responseType: 'text' })
 
  }
  deleteInvoice(id: string) {
    let url = "http://localhost:3000/api/xoahoadonmua/" + id;
    console.log(url);
    return this.http.delete(url, { responseType: 'text' });
  }
  deleteInvoiceSold(id: string) {
    let url = "http://localhost:3000/api/xoahoadonban/" + id;
    console.log(url);
    return this.http.delete(url, { responseType: 'text' });
  }
  populateForm_bought(mahd: string, macongty: string, sotien: number, data: any) {
    // this.form_bought.setValue(form);
    console.log(data);
    this.bought_form = this.formBuilder.group({
      mahd: mahd,
      macongty: macongty,
      items: this.formBuilder.array([]),
      ngaymuaban: data[0].ngaymuaban,
      tongtien: sotien
      // dongia: new FormControl('', Validators.required)

    })
    this.items = this.bought_form.get('items') as FormArray;
    data.forEach(element => {
      console.log(element);
      this.items.push(this.createItem(element));

    });
    console.log("Edit after click imelgsdgisdgstyh");
        console.log(this.bought_form);
  }
  populateForm_sold(mahd: string, makh: string, sotien: number, data: any) {
    // this.form_bought.setValue(form);
    console.log(data);
    this.sold_form = this.formBuilder.group({
      mahd: mahd,
      makh: makh,
      items: this.formBuilder.array([]),
      ngaymuaban: data[0].ngaymuaban,
      tongtien: sotien
      // dongia: new FormControl('', Validators.required)

    })
    this.items = this.sold_form.get('items') as FormArray;
    data.forEach(element => {
      console.log(element);
      this.items.push(this.createItem(element));

    });
    console.log("Edit after click imelgsdgisdgstyh");
        console.log(this.sold_form);
  }
  createItem(data): FormGroup {

    return this.formBuilder.group({
      masach: data.masach,
      quanity: data.soluong,
      price: data.dongia
    });
  }
  createTempItem(): FormGroup {
    return this.formBuilder.group({
      masach: '',
      quanity: '',
      price: ''
    });
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

}



