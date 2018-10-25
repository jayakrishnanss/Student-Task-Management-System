import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class APIService {
    constructor(private http: HttpClient) { }

    logout() {
        localStorage.removeItem('currentUser');
    }
    postAPICall(url: string, param: any) {
        return this.http.post<any>(url, param)
            .pipe(map(response => {
                return response;
            }));
    }
    getAPICall(url: string, param: any) {
        return this.http.get<any>(url + param)
            .pipe(map(response => {
                return response;
            }));
    }
}