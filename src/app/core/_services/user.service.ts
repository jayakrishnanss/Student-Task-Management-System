import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/` + id);
    }

    signUp(user: User) {
        return this.http.post<any>(`${config.apiUrl}/users/signUp`, user)
            .pipe(map(response => {
                return response;
            }));
    }

    /* update(user: User) {
        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    } */

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }
}