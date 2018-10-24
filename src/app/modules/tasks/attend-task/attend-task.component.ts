import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService } from '../../../core/_services';
import { Task } from '../../../core/_models/task';
@Component({ selector: 'app-list-task', templateUrl: 'attend-task.component.html' })
export class AttendTaskComponent implements OnInit {
    loading = false;
    currentUser: any;
    tasks: Task[];
    currentTask: string;
    totalTaskNum: number = 0;
    selQnAns: boolean;
    attTasks: any[];
    currentTaskIndex: number = 0;
    constructor(
        private apiService: APIService,
        private alertService: AlertService) { }
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.attTasks = [];
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
                                        this.tasks = data.result;
                                        this.totalTaskNum = this.tasks.length
                                        this.currentTask = this.totalTaskNum > 0 ? this.tasks[this.currentTaskIndex].question : '';
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
    showPrev(qn: string) {
        if (this.currentTaskIndex != 0) {
            this.currentTaskIndex--;
            this.currentTask = this.tasks[this.currentTaskIndex].question;
            for (let task of this.attTasks) {
                if (task.question === this.currentTask)
                    this.selQnAns = task.solution;
            }
        }
    }
    showNext(qn: string, ans: boolean) {
        if (this.currentTaskIndex != this.tasks.length - 1) {
            this.currentTaskIndex++;
            this.currentTask = this.tasks[this.currentTaskIndex].question;

            if (this.attTasks && this.attTasks.indexOf(qn) != -1)
                this.attTasks.splice(this.attTasks.indexOf(qn), 1);

            this.attTasks.push({ 'question': qn, 'solution': ans });
        }
    }
    submit(qn: string, ans: boolean) {
        if (this.attTasks && this.attTasks.indexOf(qn) != -1)
            this.attTasks.splice(this.attTasks.indexOf(qn), 1);

        this.attTasks.push({ 'question': qn, 'solution': ans });
        let taskToSubmit = {
            "classTitle": this.currentUser.class,
            "email": this.currentUser.email,
            "task": this.attTasks,
            "mark": 0
        }
        this.apiService.postAPICall(`${config.apiUrl}/task/submitTask`, taskToSubmit)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(data.message, true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    selAns(event: any) {
        this.selQnAns = (event.currentTarget.value === 'true');
    }
}
