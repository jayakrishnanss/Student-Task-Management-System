import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService } from '../../../core/_services';
import { User } from '../../../core/_models/user';

@Component({ selector: 'app-class', templateUrl: 'class.component.html' })
export class ClassComponent implements OnInit {
    classForm: FormGroup;
    loading = false;
    submitted = false;
    teachers: User[];
    students: User[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private apiService: APIService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.classForm = this.formBuilder.group({
            class: ['', [Validators.required]],
            teacher: ['', Validators.required]
        });
        // load teachers
        this.apiService.postAPICall(`${config.apiUrl}/users/getUsers`, { userType: 'teacher' })
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.loading = false;
                        this.teachers = data.result;
                        this.apiService.postAPICall(`${config.apiUrl}/users/getUsers`, { userType: 'student' })
                            .pipe(first())
                            .subscribe(
                                data => {
                                    if (data.status === 1) {
                                        this.loading = false;
                                        this.students = data.result;
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
    // convenience getter for easy access to form fields
    get f() { return this.classForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.classForm.invalid) {
            return;
        }
    }
}
