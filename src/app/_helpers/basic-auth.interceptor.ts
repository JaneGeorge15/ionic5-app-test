import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  apiUrl = 'https://devgroceryapi.spericorn.com/api';
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        if (!request.url.includes('https')) {
            const prefix = {
              url: this.apiUrl + request.url
            };
            let token: any;
            if (localStorage.getItem('authData')) {
              const authUser = JSON.parse(localStorage.getItem('authData'));
              token = authUser.token;
            } else if (sessionStorage.getItem('authData')) {
              const authUser = JSON.parse(sessionStorage.getItem('authData'));
              token = authUser.token;
            }
            const JWT = 'Bearer ' + token;
            prefix['setHeaders'] = {
              Authorization: JWT,
              'X-Requested-With': 'XMLHttpRequest'
            };
            request = request.clone(prefix);
            return next.handle(request);
          } else {
            request = request.clone({ url: request.url });
            return next.handle(request);
          }
    }
}