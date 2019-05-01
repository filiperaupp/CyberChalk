import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserSolicitationComponent } from './admin/user/user-solicitation/user-solicitation.component';
import { Role } from './models/role';
import { UserComponent } from './admin/user/user.component';
import { AllUsersComponent } from './admin/user/all-users/all-users.component';
import { AllSolicitationsComponent } from './admin/user/all-solicitations/all-solicitations.component';
import { CategoryComponent } from './admin/category/category.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent, canActivateChild:[AuthGuard], children:[
        { path: 'admin', data: { roles: [Role.Admin] },  children: [
            { path:'user', component: UserComponent, children: [
                { path:'solicitations', component: UserSolicitationComponent },
                { path:'solicitations-all', component: AllSolicitationsComponent },
                { path:'all', component: AllUsersComponent },
                { path: '', redirectTo: 'solicitations', pathMatch:'full' }
            ]},
            { path:'category', component: CategoryComponent}
        ]},
        { path: '', redirectTo:'login' ,pathMatch:'full'}
    ] },
    
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});