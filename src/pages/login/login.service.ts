import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(data: any): Observable<any> {
        return this.http.post(`/auth/login`, data)
            .pipe(map(res => {
                localStorage.setItem('authData', JSON.stringify(res['data']));
                return res;
            }));
    }
}
