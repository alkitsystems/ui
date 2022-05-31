import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../../../config';
import { IUser } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<IUser[]>(`${config.apiUrl}/users`);
    }
}