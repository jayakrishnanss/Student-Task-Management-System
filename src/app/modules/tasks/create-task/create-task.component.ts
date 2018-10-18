import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService } from '../../../core/_services';
import { User } from '../../../core/_models/user';

@Component({ selector: 'app-list-user', templateUrl: 'create-task.component.html' })
export class CreateTaskComponent implements OnInit {
    loading = false;
    users: User[];
    userType = '';
    thisUser:any;
    constructor(
        private apiService: APIService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.loading = true;
        const parameters = new URLSearchParams(window.location.search);
        this.userType = parameters.get('type');
        this.apiService.postAPICall(`${config.apiUrl}/users/getUsers`, { userType: this.userType.toLowerCase() })
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.loading = false;
                        this.users = data.result;
                    } else {
                        this.alertService.error(data.message);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    deleteUser(user: User) {
        this.loading = true;
        this.thisUser = user;
        this.apiService.postAPICall(`${config.apiUrl}/users/deleteUser`, user)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.loading = false;
                        this.users.splice(this.users.indexOf(this.thisUser), 1)
                    } else {
                        this.alertService.error(data.message);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    };
    approveUser(user: User) {
        this.loading = true;
        user.isApproved = true;
        this.apiService.postAPICall(`${config.apiUrl}/users/approveUser`, user)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.loading = false;
                    } else {
                        this.alertService.error(data.message);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    };
}
