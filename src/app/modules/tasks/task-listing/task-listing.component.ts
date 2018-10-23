import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService } from '../../../core/_services';

@Component({ selector: 'app-list-task', templateUrl: 'task-listing.component.html' })
export class ListTaskComponent implements OnInit {
    loading = false;
    currentUser: any;

    constructor(
        private apiService: APIService,
        private alertService: AlertService) { }
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.apiService.postAPICall(`${config.apiUrl}/class/getStudentClass`, { _id: this.currentUser.id })
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.alertService.success(data.message, true);
                        this.loading = false;
                        this.currentUser.class = data.result;
                        this.apiService.postAPICall(`${config.apiUrl}/task/listTasks`, { classTitle: this.currentUser.class, userType: 'student' })
                            .pipe(first())
                            .subscribe(
                                data => {
                                    if (data.status === 1) {
                                        this.alertService.success(data.message, true);
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
}
