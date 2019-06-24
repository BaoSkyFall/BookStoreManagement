import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatIcon, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { IUser } from '../users';
import { UserService } from '../service/user.service';
import { TableUserDialogComponent } from './table-user-dialog/table-user-dialog.component';
import { NoficationService } from '../service/nofication.service';
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
     users = [];
    constructor(private _userservice: UserService, private nofication: NoficationService, private http: HttpClient, private dialog: MatDialog) { };
    private listData = new MatTableDataSource<IUser>();
    displayedColumns: string[] = ['manv', 'tennv', 'diachi', 'email', 'username', 'pass', 'link_avatar', '_role', 'chucvu', 'actions'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string = "";
    loadData() {
        this._userservice.getallUsers().subscribe(data => {
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
        this.applyFilter();
    }

    applyFilter() {
        console.log(this.searchKey);
        this.listData.filter = this.searchKey.trim().toLowerCase();
        console.log(this.listData);
    }

    onCreate() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.data = {

            isAdd: true
        };
        const dialogRef = this.dialog.open(TableUserDialogComponent, dialogConfig);


        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            if (result) {
                this.loadData();
            }
        });

    }
    onEdit(row) {
        console.log(row);
        this._userservice.populateForm(row);
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.data = {

            isAdd: false,
            link_avatar: row.link_avatar
        };
        const dialogRef = this.dialog.open(TableUserDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            if (result) {
                this.loadData();
            }
        });
    }
    onDelete(row) {
        console.log(row);
        this._userservice.DeleteUser(row).subscribe(result => {
            if (result == "Delete successfull") {
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






