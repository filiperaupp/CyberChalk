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
    ThemeComponent
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
