﻿import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './core/_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './core/_directives';
import { AuthGuard } from './core/_guards';
import { JwtInterceptor, ErrorInterceptor } from './core/_helpers';
import { AlertService, APIService } from './core/_services';
import { HomeComponent } from './modules/home';
import { LoginComponent } from './modules/login';
import { RegisterComponent } from './modules/register';
import {FooterComponent} from './modules/shared/footer';
import {HeaderComponent} from './modules/shared/header';
import {UserListingComponent} from './modules/admin/user-listing';
import {CreateTaskComponent} from './modules/tasks/create-task';
import {ClassComponent} from './modules/admin/class';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Globals } from './core/_helpers/globals';
import {DataTableModule} from "angular-6-datatable";
import { from } from 'rxjs';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        AngularFontAwesomeModule,
        DataTableModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserListingComponent,
        ClassComponent,
        CreateTaskComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        APIService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Globals,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }