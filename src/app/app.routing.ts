import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home';
import { LoginComponent } from './modules/login';
import { RegisterComponent } from './modules/register';
import { UserListingComponent } from './modules/admin/user-listing';
import {CreateTaskComponent} from './modules/tasks/create-task';
import {ListTaskComponent} from './modules/tasks/task-listing';
import {ClassComponent} from './modules/admin/class';
import { AuthGuard } from './core/_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-listing', component: UserListingComponent, canActivate: [AuthGuard] },
    { path: 'create-class', component: ClassComponent, canActivate: [AuthGuard] },
    { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
    { path: 'list-tasks', component: ListTaskComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);