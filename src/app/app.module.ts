import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { TableUserComponent } from './table-user/table-user.component';
import { SettingsComponent } from './settings/settings.component';
import { InvoiceBoughtComponent } from './invoice-bought/invoice-bought.component';
import { InvoiceSoldComponent } from './invoice-sold/invoice-sold.component';
import { LoginComponent } from './login/login.component';
import * as Material from "@angular/material";
import { TableUserDialogComponent } from './table-user/table-user-dialog/table-user-dialog.component';
import { InvoiceBouthgtBoughtDialogComponent } from './invoice-bought/invoice-bouthgt-bought-dialog/invoice-bouthgt-bought-dialog.component';
import { TableDialogComponent } from './table/table-dialog/table-dialog.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { InvoiceSoldDialogComponent } from './invoice-sold/invoice-sold-dialog/invoice-sold-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TableUserComponent,
    SettingsComponent,
    InvoiceBoughtComponent,
    InvoiceSoldComponent,
    LoginComponent,
    TableUserDialogComponent,
    InvoiceBouthgtBoughtDialogComponent,
    TableDialogComponent,
    InvoiceSoldDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),

    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})

  ],
  providers: [
    AuthGuardService,
    AuthService,
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  entryComponents:[TableUserDialogComponent,TableDialogComponent,InvoiceBouthgtBoughtDialogComponent,InvoiceSoldDialogComponent],
})
export class AppModule { }
