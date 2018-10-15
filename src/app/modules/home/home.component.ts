import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../core/_models';
import { APIService } from '../../core/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private apiService: APIService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    deleteUser(id: number) {
        /* this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        }); */
    }

    private loadAllUsers() {
        /* this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        }); */
    }
}