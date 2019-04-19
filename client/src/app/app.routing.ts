import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserSolicitationComponent } from './user-solicitation/user-solicitation.component';
import { SolicitationFormComponent } from './solicitation-form/solicitation-form.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, children:[
        { path:'login', component:LoginComponent},
        { path:'solicitation', component:SolicitationFormComponent},
    ]},
    { path: 'board', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent, children:[
        { path: 'solicitation', children: [
            { path:'user', component: UserSolicitationComponent }
        ]},
        { path: '', redirectTo:'login' ,pathMatch:'full'}
    ] },
    
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});