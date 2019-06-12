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

export const AppRoutes: Routes = [
    //Start
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table-books',
        component: TableComponent
    },
    {
        path: 'table-user',
        component: TableUserComponent
    },
    {
        path: 'invoice-bought',
        component: InvoiceBoughtComponent
    },
    {
        path: 'invoice-sold',
        component: InvoiceSoldComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    //End
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    }
]
