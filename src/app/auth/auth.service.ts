import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService
  constructor() { }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return token ? true : false;
  }
} 
