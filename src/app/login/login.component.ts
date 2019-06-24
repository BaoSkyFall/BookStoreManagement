import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }
  username: string;
  password:string;
  ngOnInit() {
    localStorage.removeItem('token');
  }
  onLogin()
  {
    if(this.username == "admin" && this.password == "admin")
    {
      window.location.href = '/table-user';  
      localStorage.setItem('token', 'admin login');


    }
  }
}
