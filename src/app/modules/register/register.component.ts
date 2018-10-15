import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, APIService } from '../../core/_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private apiService: APIService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            userType: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        // Sign up API call
        this.apiService.postAPICall(`${config.apiUrl}/users/signUp`,this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.status === 1){
                        this.alertService.success(data.message, true);
                        this.loading = false;
                        this.router.navigate(['/login']);
                    }else{
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
