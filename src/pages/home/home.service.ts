import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

    constructor(private http: HttpClient) { }

    fetchProfileData(): Observable<any> {
        return this.http.get(`/user`)
            .pipe(map(res => {
                return res;
            }));
    }

}
