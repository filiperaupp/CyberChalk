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
import { MyCoursesComponent } from './user-stuff/my-courses/my-courses.component';
import { CourseManageComponent } from './user-stuff/course-manage/course-manage.component';
import { CourseEditComponent } from './user-stuff/course-edit/course-edit.component';
import { ContentToCourseComponent } from './user-stuff/content-to-course/content-to-course.component';
import { ContentItemComponent } from './user-stuff/content-item/content-item.component';
import { ContentCourseControlComponent } from './admin/content-course-control/content-course-control.component';
import { ContentsComponent } from './admin/content-course-control/contents/contents.component';
import { CoursesComponent } from './admin/content-course-control/courses/courses.component';
import { ThemeContentComponent } from './category-content/theme-content/theme-content.component';
import { ShowContentComponent } from './category-content/show-content/show-content.component';
import { ShowCourseComponent } from './category-content/show-course/show-course.component';
import { MyProgressComponent } from './user-stuff/my-progress/my-progress.component';
import { ProfileComponent } from './user-stuff/profile/profile.component';
import { MainComponent } from './dashboard/main/main.component';

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
            { path: 'categories', component: CategoryThemeControlComponent, children:[
                { path: 'all', component: CategoryComponent },
                { path: 'themes', component: ThemeComponent },
                { path: '', redirectTo: 'all', pathMatch: 'full' }
            ]},
            { path: 'contents-and-courses', component: ContentCourseControlComponent, children:[
                { path: 'contents', component: ContentsComponent },
                { path: 'courses', component: CoursesComponent },
                { path: '', redirectTo: 'contents', pathMatch: 'full' }
            ]}
        ]},
        { path: 'profile', component: ProfileComponent },
        { path: 'my-stuff', component: UserStuffComponent, children:[
            { path: 'contents', children: [
                { path: 'list', component: MyContentsComponent },
                { path: 'content-manage', component: ContentManageComponent },
                { path: 'content-manage/:id', component: ContentManageComponent },
                { path: '', redirectTo: 'list', pathMatch: 'full' }
            ] },
            { path: '', redirectTo: 'contents/list', pathMatch: 'full' },
            { path: 'courses',  children:[
                { path: 'list', component: MyCoursesComponent },
                { path: 'course-manage', component: CourseManageComponent },
                { path: 'course-manage/:id', component: CourseEditComponent, children: [
                    { path: '', component: ContentItemComponent },                    
                    { path: 'create-content', component: ContentToCourseComponent },
                    { path: 'edit-content/:id', component: ContentToCourseComponent },
                    { path: '', redirectTo: '', pathMatch: 'full' }
                ]},
                { path: '', redirectTo:'list', pathMatch:'full' }
            ] },
        ] },
        { path:'progress', component: MyProgressComponent },
        { path:'category/:id', component: CategoryContentComponent },
        { path:'category/:idCa/theme/:idTh', component: ThemeContentComponent },
        { path:'category/:idCa/theme/:idTh/content/:idCo', component: ShowContentComponent },
        { path:'category/:idCa/theme/:idTh/course/:idCou', component: ShowCourseComponent },

        { path: 'main', component: MainComponent },
        { path: '', redirectTo:'main' ,pathMatch:'full'}
    ] },
    
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});