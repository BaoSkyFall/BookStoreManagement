import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getallUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>("http://localhost:3000/api/tatcanhanvien");
  }
}
