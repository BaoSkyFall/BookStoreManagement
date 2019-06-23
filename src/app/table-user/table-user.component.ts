import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatIcon, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { IUser } from '../users';
import { UserService } from '../service/user.service';
import { TableUserDialogComponent } from './table-user-dialog/table-user-dialog.component';
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
    constructor(private _userservice: UserService, private http: HttpClient, private dialog: MatDialog) { };
    private listData = new MatTableDataSource<IUser>();
    displayedColumns: string[] = ['manv','tennv', 'diachi', 'email', 'username', 'pass', 'link_avatar', '_role', 'chucvu', 'actions'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string = "";
    public tableData1: TableData;
    public tableData2: TableData;
    public delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    ngOnInit() {
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
    onSearchClear() {
        this.searchKey = "";
        this.applyFilter();
    }

    applyFilter() {
        console.log(this.searchKey);
        this.listData.filter = this.searchKey.trim().toLowerCase();

    }

    onCreate() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "100%";
        this._userservice.form.reset();
        const dialogRef = this.dialog.open(TableUserDialogComponent, {
            width: '950px',

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
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
      
            isAdd : false
        };
        const dialogRef = this.dialog.open(TableUserDialogComponent, dialogConfig);
    }

}






