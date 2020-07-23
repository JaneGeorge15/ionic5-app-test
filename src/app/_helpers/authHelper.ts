import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHelper {
    constructor(
        private router: Router,
        private location: Location,
    ) {
        this.getAuthUser();
    }

    profileUpdated: Subject<any> = new Subject();
    loggedInState: Subject<any> = new BehaviorSubject(false);


    getToken() {
        const localAuthUser = JSON.parse(localStorage.getItem('authData'));
        const sessionAuthUser = JSON.parse(sessionStorage.getItem('authData'));
        if (localAuthUser != null) {
            this.loggedInState.next(true);
            return localAuthUser.accessToken;
        } else if (sessionAuthUser != null) {
            this.loggedInState.next(true);
            return sessionAuthUser.accessToken;
        } else {
            this.loggedInState.next(false);
            return false;
        }
    }

    getAuthUser() {
        const localAuthUser = JSON.parse(localStorage.getItem('authData'));
        const sessionAuthUser = JSON.parse(sessionStorage.getItem('authData'));
        if (localAuthUser != null) {
            this.loggedInState.next(localAuthUser);
            return localAuthUser;
        } else if (sessionAuthUser != null) {
            this.loggedInState.next(sessionAuthUser);
            return sessionAuthUser;
        } else {
            this.loggedInState.next('');
            return false;
        }
    }

  

    setLocalStorage(authData: any) {
        localStorage.setItem('authData', JSON.stringify(authData));
        this.loggedInState.next(authData);
    }

    updateLocalStorage(authData: any) {
        localStorage.setItem('authData', JSON.stringify(authData));
    }

    setSessionStorage(authData: any) {
        sessionStorage.setItem('authData', JSON.stringify(authData));
        this.loggedInState.next(authData);
    }

    updateSessionStorage(authData: any) {
        localStorage.setItem('authData', JSON.stringify(authData));
    }

    logout() {
        localStorage.removeItem('authData');
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/login']);
    }
}
