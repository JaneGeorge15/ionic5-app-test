import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registration(data: any): Observable<any> {
    return this.http.post(`/auth/register`, data)
      .pipe(map(res => {
        return res;
      }));
  }
}
