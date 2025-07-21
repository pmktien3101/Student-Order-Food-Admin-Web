import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CategoryComponent } from './pages/category/category.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { 
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path:'user',
                component: UserComponent
            },
            {
                path:'shop',
                component:ShopComponent
            },
            {
                path:'category',
                component:CategoryComponent
            },
            {
                path:'withdraw',
                component:WithdrawComponent
            }
        ]
    }
];
