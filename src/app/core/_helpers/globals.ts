import { Injectable } from '@angular/core';
import { User } from '../_models/user';
@Injectable()
export class Globals {
    currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
}