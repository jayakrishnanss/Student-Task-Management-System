import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, APIService, ModalService } from '../../../core/_services';
import { StudTask } from '../../../core/_models/studtask';

@Component({
    selector: 'app-review-task',
    templateUrl: 'review-task.component.html',
    styleUrls: ['review-task.component.scss']
})
export class ReviewTaskComponent implements OnInit {
    loading = false;
    currentUser: any;
    tasksForReview: StudTask[];
    selectedTask: StudTask;
    selTaskArray: object[];
    totalMark: number = 0;
    constructor(
        private apiService: APIService,
        private alertService: AlertService,
        private modalService: ModalService) { }
    ngOnInit() {
        this.selectedTask = new StudTask();
        this.apiService.getAPICall(`${config.apiUrl}/task/getSubmittedTasks`, '')
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.loading = false;
                        this.tasksForReview = data.result;
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
    selectTask(task: StudTask) {
        this.selectedTask = task;
        this.selTaskArray = [];
        for (let thisTask of this.selectedTask.task) {
            this.selTaskArray.push(thisTask);
        }
        this.modalService.open('review-modal');
    }
    reviewTask() {
        this.apiService.postAPICall(`${config.apiUrl}/task/listTasks`, { classTitle: this.selectedTask.classTitle, userType: 'teacher' })
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 1) {
                        this.alertService.success(data.message, true);
                        this.loading = false;
                        this.totalMark = 0;
                        for (let dataresult of data.result) {
                            for (let selTask of this.selTaskArray) {
                                if (selTask['question'] === dataresult.question) {
                                    selTask['correctAns'] = dataresult.solution;
                                    if (selTask['solution'] === dataresult.solution) {
                                        selTask['mark'] = 1;
                                        this.totalMark++;
                                    }
                                    else
                                        selTask['mark'] = 0;
                                }
                            }
                        }
                        debugger
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
    closeModal(id: string) {
        this.modalService.close(id);
    }
}
