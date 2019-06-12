import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IBook} from '../books';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }
  getallBooks(): Observable<IBook[]>{
    return this.http.get<IBook[]>("http://localhost:3000/api/tatcasach");
  }

}
