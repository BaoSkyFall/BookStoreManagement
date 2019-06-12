import { Component } from '@angular/core';
import { Router  , ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
 constructor(private router: Router){}
event:any;
 public onRouterOutletActivate(_event : any) {

  this.event =_event.__proto__.constructor.name;
}
_isLogin = true;
public isLogin()
{
 
  
  if(this.event == "LoginComponent")
  return true;
  else return false;
}
ngOnInit() {

    
}



}
