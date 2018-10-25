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
    selectedStudents: any[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private apiService: APIService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.classForm = this.formBuilder.group({
            classTitle: ['', [Validators.required]],
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
        this.loading = true;
        var calssReq =  this.classForm.value;
        calssReq.students = this.selectedStudents;
        
        this.apiService.postAPICall(`${config.apiUrl}/class/createClass`,calssReq)
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
    }
    onSelectStudent(student: User, event: any) {
        if (!this.selectedStudents)
            this.selectedStudents = [];

        if (event.currentTarget.checked)
            this.selectedStudents.push(student._id);
        else
            this.selectedStudents.splice(this.selectedStudents.indexOf(student._id), 1);
    }
}
