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
import { CategoryComponent } from './admin/category-theme-control/category/category.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { CategoryThemeControlComponent } from './admin/category-theme-control/category-theme-control.component';
import { ThemeComponent } from './admin/category-theme-control/theme/theme.component';
import { MyContentsComponent } from './user-stuff/my-contents/my-contents.component';
import { UserStuffComponent } from './user-stuff/user-stuff.component';
import { ContentManageComponent } from './user-stuff/content-manage/content-manage.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], canActivateChild:[AuthGuard], children:[
        { path: 'admin', data: { roles: [Role.Admin] },  children: [
            { path: 'user', component: UserComponent, children: [
                { path: 'solicitations', component: UserSolicitationComponent },
                { path: 'solicitations-all', component: AllSolicitationsComponent },
                { path: 'all', component: AllUsersComponent },
                { path: '', redirectTo: 'solicitations', pathMatch:'full' }
            ]},
            { path:'categories', component: CategoryThemeControlComponent, children:[
                { path: 'all', component: CategoryComponent },
                { path: 'themes', component: ThemeComponent },
                { path: '', redirectTo: 'all', pathMatch: 'full' }
            ]}
        ]},
        { path: 'my-stuff', component: UserStuffComponent, children:[
            { path: 'contents', children: [
                { path: 'list', component: MyContentsComponent },
                { path: 'content-manage', component: ContentManageComponent },
                { path: 'content-manage/:id', component: ContentManageComponent },
                { path: '', redirectTo: 'list', pathMatch: 'full' }
            ] },
            { path: '', redirectTo: 'contents/list', pathMatch: 'full' }
            // { path: 'courses', component: MyCoursesComponenet, children:[
            // ] },
        ] },
        { path: 'category/:id', component: CategoryContentComponent },
        { path: '', redirectTo:'login' ,pathMatch:'full'}
    ] },
    
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});