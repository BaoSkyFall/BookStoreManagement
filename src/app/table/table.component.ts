import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

import {IBook} from '../books';
import * as _ from 'lodash';


declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public books = [];

    public tableData1: TableData;
    public tableData2: TableData;
    constructor(private _bookservice: BooksService, private http: HttpClient){};
    public test()
    {
        console.log(this.books);
    }
    public delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    ngOnInit(){
     this._bookservice.getallBooks().subscribe(data =>{
      console.log(data);
        this.books = data;
     });


     this.delay(300).then(any=>{
         console.log(this.books);
        this.tableData1 = {
            headerRow: ['', 'Ma Sach', 'Anh Bia','Ten Sach', 'The Loai', 'Soluong','Gia Nhap','Gia Ban','Tac Gia','Option'],
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
