import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { UserService } from '../service/user.service';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {
    public users = [];
    constructor(private _userservice: UserService, private http: HttpClient){};

  public tableData1: TableData;
  public tableData2: TableData;
  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  ngOnInit(){
    this._userservice.getallUsers().subscribe(data =>{
        console.log(data);
          this.users = data;
       });
       this.delay(300).then(any=>{
           console.log(this.users);
      this.tableData1 = {
          headerRow: ['','ID', 'Ten', 'Dia Chi', 'Email', 'Username','Password','Avatar','Chuc vu','Option'],
          dataRows: [
              ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
              ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
              ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
              ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
              ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
              ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
          ]
      };
      this.tableData2 = {
          headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
          dataRows: [
              ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
              ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
              ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
              ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
              ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
              ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
          ]
      };
    });
}
}
    



  

