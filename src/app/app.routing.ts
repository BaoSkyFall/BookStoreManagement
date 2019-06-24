import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { TableUserComponent } from './table-user/table-user.component';
import { InvoiceBoughtComponent } from './invoice-bought/invoice-bought.component';
import { InvoiceSoldComponent } from './invoice-sold/invoice-sold.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { 
    AuthGuardService as AuthGuard 
  } from './auth/auth-guard.service';
  
export const AppRoutes: Routes = [
    //Start
    // {
    //     path: 'user',
    //     component: UserComponent
    // },
    // {
    //     path: 'dashboard',
    //     component: DashboardComponent,
    //     canActivate: [AuthGuard] 
    // },

    {
        path: 'table-books',
        component: TableComponent,
        canActivate: [AuthGuard] 
        
    },
    {
        path: 'table-user',
        component: TableUserComponent,
        canActivate: [AuthGuard] 
        
    },
    {
        path: 'invoice-bought',
        component: InvoiceBoughtComponent,
        canActivate: [AuthGuard] 
        
        },
    {
        path: 'invoice-sold',
        component: InvoiceSoldComponent,
        canActivate: [AuthGuard] 
        
    },

    {
        path: 'login',
        component: LoginComponent
    },
    //End
   
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }
]
