import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  form: FormGroup = new FormGroup(
    {
      $key: new FormControl(null),
      manv: new FormControl('',Validators.required),
      tennv: new FormControl('',Validators.required),
      diachi: new FormControl('',Validators.required),

      email: new FormControl('',[Validators.required,Validators.minLength(8)]),
      username: new FormControl('',Validators.required),
      pass: new FormControl('',Validators.required),
      link_avatar: new FormControl('',Validators.required),
      _role: new FormControl('',Validators.required),
      chucvu: new FormControl('',Validators.required),
      
      
      
      
      
   
    }
  );
  constructor(private http:HttpClient) { }
  getallUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>("http://localhost:3000/api/tatcanhanvien");
  }
  intializeForm()
  {
    this.form.setValue({

      
      
      
    })
  }
  AddnewUers(user: FormGroup)
  {
    console.log(user.value);
    this.http.post("http://localhost:3000/api/themnhanvien",user.value).subscribe(res=>{
               //here you received the response of your post
               console.log(res);
               //you can do asomething, like
           
         })
    
  }
}
