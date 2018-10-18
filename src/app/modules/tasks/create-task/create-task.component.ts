import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService } from '../../../core/_services';
import { StudClass } from '../../../core/_models/class';

@Component({ selector: 'app-list-user', templateUrl: 'create-task.component.html' })
export class CreateTaskComponent implements OnInit {
    taskForm: FormGroup;
    loading = false;
    classes: StudClass[];
    constructor(
        private formBuilder: FormBuilder,
        private apiService: APIService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.taskForm = this.formBuilder.group({
            class: ['', Validators.required],
            description: ['', Validators.required],
            question: ['', [Validators.required]],
            solution: ['', [Validators.required]],
            taskans: ['', Validators.required],
            title: ['', Validators.required]
        });
        this.loading = true;
        this.apiService.getAPICall(`${config.apiUrl}/class/listClasses`, '')
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.loading = false;
                        this.classes = data.result;
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
    get f() { return this.taskForm.controls; }
    onSubmit() {
        if (this.taskForm.invalid) {
            return;
        }
        debugger
        console.log(this.taskForm)
    }
}
