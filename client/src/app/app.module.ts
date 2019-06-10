import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSolicitationComponent } from './admin/user/user-solicitation/user-solicitation.component';
import { SolicitationFormComponent } from './solicitation-form/solicitation-form.component';
import { LoaderComponent } from './common/loader/loader.component';
import { UserComponent } from './admin/user/user.component';
import { AllUsersComponent } from './admin/user/all-users/all-users.component';
import { AllSolicitationsComponent } from './admin/user/all-solicitations/all-solicitations.component';
import { FilterNamePipe } from './pipes/filter-name.pipe';
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
import { FilterStatusPipe } from './pipes/filter-status.pipe';
import { ThemeContentComponent } from './category-content/theme-content/theme-content.component';
import { ShowContentComponent } from './category-content/show-content/show-content.component';
import { ShowCourseComponent } from './category-content/show-course/show-course.component';
import { MyProgressComponent } from './user-stuff/my-progress/my-progress.component';
import { ProfileComponent } from './user-stuff/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserSolicitationComponent,
    SolicitationFormComponent,
    LoaderComponent,
    UserComponent,
    AllUsersComponent,
    AllSolicitationsComponent,
    FilterNamePipe,
    CategoryComponent,
    CategoryContentComponent,
    CategoryThemeControlComponent,
    ThemeComponent,
    MyContentsComponent,
    UserStuffComponent,
    ContentManageComponent,
    MyCoursesComponent,
    CourseManageComponent,
    CourseEditComponent,
    ContentToCourseComponent,
    ContentItemComponent,
    ContentCourseControlComponent,
    ContentsComponent,
    CoursesComponent,
    FilterStatusPipe,
    ThemeContentComponent,
    ShowContentComponent,
    ShowCourseComponent,
    MyProgressComponent,
    ProfileComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
