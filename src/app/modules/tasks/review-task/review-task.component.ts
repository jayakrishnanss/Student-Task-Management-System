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
    constructor(
        private apiService: APIService,
        private alertService: AlertService,
        private modalService: ModalService) { }
    ngOnInit() {
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
    reviewTask(task: StudTask) {
        debugger
        this.modalService.open('review-modal');
    }
    closeModal(id: string) {
        this.modalService.close(id);
    }
}
