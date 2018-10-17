import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home';
import { LoginComponent } from './modules/login';
import { RegisterComponent } from './modules/register';
import { UserListingComponent } from './modules/admin/user-listing';
import {ClassComponent} from './modules/admin/class';
import { AuthGuard } from './core/_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-listing', component: UserListingComponent },
    { path: 'create-class', component: ClassComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);