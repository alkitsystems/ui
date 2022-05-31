import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { config } from '../../../config';
import { IUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<IUser | null>;
    public currentUser: Observable<IUser | null>;

    constructor(private http: HttpClient) {
        const usr: string = localStorage.getItem('currentUser') || "null";
        let user = JSON.parse(usr, (key: any, value: any) => {
            if (value && typeof value === 'string') {
                return value;
            }
            return null;
        });
        this.currentUserSubject = new BehaviorSubject<IUser | null>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IUser | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}