import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService } from '../../../core/_services';
import { StudClass } from '../../../core/_models/class';
import { Task } from '../../../core/_models/task';

@Component({ selector: 'app-create-task', templateUrl: 'create-task.component.html' })
export class CreateTaskComponent implements OnInit {
    taskForm: FormGroup;
    loading = false;
    submitted = false;
    classes: StudClass[];
    tasks: Task[];
    selQn: string;
    selQnAns: boolean;
    constructor(
        private formBuilder: FormBuilder,
        private apiService: APIService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.taskForm = this.formBuilder.group({
            classTitle: ['', Validators.required],
            question: ['', [Validators.required]],
            solution: ['', Validators.required]
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
        this.submitted = true;
        if (this.taskForm.invalid) {
            return;
        }
        this.loading = true;
        this.apiService.postAPICall(`${config.apiUrl}/task/createTask`, this.taskForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.alertService.success(data.message, true);
                        this.loading = false;
                        this.getTask(this.taskForm.value.classTitle);
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
    changeClass(event: any) {
        this.getTask(event.target.value);
    }
    getTask(classTitle: string) {
        this.apiService.postAPICall(`${config.apiUrl}/task/listTasks`, { classTitle: classTitle })
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.alertService.success(data.message, true);
                        this.loading = false;
                        this.tasks = data.result;
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
    editTask(task:Task) {
        this.selQn = task.question;
        this.selQnAns = task.solution;
        
    }
    deleteTask(task:Task) {

    }
}
