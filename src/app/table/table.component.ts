import { Component, OnInit, ViewChild } from '@angular/core';

import { BooksService } from '../service/books.service';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatIcon, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { TableDialogComponent } from './table-dialog/table-dialog.component'

import { IBook } from '../books';
import { NoficationService } from '../service/nofication.service';


declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    public books = [];
    constructor(private _bookservice: BooksService, private http: HttpClient, private nofication: NoficationService, private dialog: MatDialog) { };
    listData = new MatTableDataSource<IBook>();
    displayedColumns: string[] = ['masach', 'tensach', 'theloai', 'link_anhbia', 'soluong', 'gianhap', 'giaban', 'tacgia', 'actions'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string = "";
    loadData() {
        this._bookservice.getallBooks().subscribe(data => {
            console.log(data);
            this.listData = new MatTableDataSource(data);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.listData.filterPredicate = (data, filter) => {
                return this.displayedColumns.some(ele => {
                    return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
                });
            };
        });
    }
    ngOnInit() {
        this.loadData();

    }
    onSearchClear() {
        this.searchKey = "";
        this.applyFilter("");
    }

    applyFilter(filterValue: string) {
        this.listData.filter = filterValue.trim().toLowerCase();
    
        if (this.listData.paginator) {
          this.listData.paginator.firstPage();
        }
      }

    onCreate() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.data = {

            isAdd: true,
            link_anhbia: "",
            link_anhsau: "",
            link_trangdau: ""
        };
        const dialogRef = this.dialog.open(TableDialogComponent, dialogConfig);


        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            if (result) {
                this.loadData();
            }
        });
    }
    onEdit(row) {
        console.log(row);
        this._bookservice.populateForm(row);
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.data = {

            isAdd: false,
            link_anhbia: row.link_anhbia,
            link_anhsau: row.link_anhsau,
            link_trangdau: row.link_trangdau

        };
        const dialogRef = this.dialog.open(TableDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            if (result) {
                this.loadData();
            }
        });
    }
    onDelete(row) {
        console.log(row);
        this._bookservice.deleteBook(row).subscribe(result => {
            if (result == "Delete Successfull") {
                this.nofication.success(":: Delete Successfull")
                this.loadData();
            }
            else {
                this.nofication.warn(":: Can't Delete User!");

            }
        }, err => {
            this.nofication.warn(":: Can't Delete User!");

        });
    }

}
