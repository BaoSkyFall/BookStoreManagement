import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IBook} from '../books';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  form: FormGroup = new FormGroup(
    {

      masach: new FormControl('',Validators.required),
      tensach: new FormControl('',Validators.required),
      theloai: new FormControl('',Validators.required),

      link_anhbia: new FormControl('',Validators.required),
      link_anhsau: new FormControl('',Validators.required),
      link_trangdau: new FormControl('',Validators.required),
      soluong: new FormControl('',Validators.required),
      gianhap: new FormControl('',Validators.required),
      giaban: new FormControl('',Validators.required),
      tacgia: new FormControl('',Validators.required),
      tinhtrang: new FormControl('',Validators.required)
      
      
      
      
      
   
    }
  );
  constructor(private http: HttpClient) { }
  getallBooks(): Observable<IBook[]>{
    return this.http.get<IBook[]>("http://localhost:3000/api/tatcasach");
  }
  addNewBook(book : FormGroup)
  {
    console.log(book);
    return this.http.post("http://localhost:3000/api/themsach",book.value,{responseType:'text'})
  }
  updateBook(book:  FormGroup)
  {
    console.log(book.value);
    return this.http.put("http://localhost:3000/api/tatcasach",book.value,{responseType:'text'})

  }
  deleteBook(book: any)
  {
    console.log(book.manv);
    let url = "http://localhost:3000/api/xoasach/" + book.masach;
    console.log(url);
    return this.http.delete(url,{responseType:'text'});
  }
  populateForm(book: FormGroup)
  {
    this.form.setValue(book);
  }
}
