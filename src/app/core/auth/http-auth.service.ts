import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LoginPage } from '../../../pages/login/login.component';

@Injectable()
export class HttpOAuthService extends Http {

  public http: any;

  // SLASHMOBILITY STAGING SERVER:
  // public endpoint = `http://pixind-cabinet-api.cubettech.in/`;

  // LIVE SERVER
  public endpoint = `http://slickeep-api.perspectiva.barcelona/`;

  // METODIAN STAGING SERVER:
  // public endpoint = `http://192.168.1.17:8000/`;

  public body: any = {
    client_id: 1,
    client_secret: 'Bmtt9FmtNY9I31ohJmJu8rpqTgi965jZnu9RlkUz',
    grant_type: 'password'
  };

  constructor(
    http: Http,
    backend: XHRBackend,
    options: RequestOptions,
    private app: App
  ) {
    super(backend, options);
    this.http = http;
  }

  /**
   * Send a request.
   * @param {Request} req - Request.
   * @param {RequestOptionsArgs} options - Options.
   * @memberof HttpOAuthService
   */
  public request(req: Request, options?: RequestOptionsArgs): Observable<Response> {
    const nowTime = Date.now();
    let lastTokenExpiration = localStorage.getItem('token_expiration');
    let lastTokenTime = localStorage.getItem('token_time');

    if((lastTokenTime !== null) && (lastTokenExpiration !== null) && (nowTime - parseInt(lastTokenTime)) <= parseInt(lastTokenExpiration)) {
      // Just make the request for data

      const tokenType = localStorage.getItem('token_type');
      const tokenAccess = localStorage.getItem('token_access');
      options = {headers: new Headers()};
      options.headers.set(
        'Authorization',
        `${tokenType} ${tokenAccess}`
      );
      req.url = this.endpoint + req.url;
      req.headers = options.headers;
      return super.request(req, options);
    } else {
      // Last token has expired, so let's request a new one

      this.body.username = localStorage.getItem('user_username');
      this.body.password = localStorage.getItem('user_password');

      if(!this.body.username || !this.body.password) {
        // LocalStorage has been unexpectedly removed, so need to logout
        this.logout();
      }

      return this.http
      .post(
        this.endpoint+'oauth/token',
        this.body
      ).flatMap((res: any) => {
        const payload = res.json();
        let tokenExpiration = ((payload.expires_in - 10) * 1000); // To milliseconds
        if (tokenExpiration <= 0) tokenExpiration = 0;

        localStorage.setItem('token_expiration', String(tokenExpiration));
        localStorage.setItem('token_time', String(Date.now()));
        localStorage.setItem('token_type', payload.token_type);
        localStorage.setItem('token_access', payload.access_token);

        options = {headers: new Headers()};
        options.headers.set(
          'Authorization',
          `${payload.token_type} ${payload.access_token}`
        );
        req.url = this.endpoint + req.url;
        req.headers = options.headers;
        return super.request(req, options);
      }).catch(this.catchAuthError(this));
    }

  }

  /**
   * Catches auth errors.
   * @param {HttpOAuthService} self - The request.
   * @memberof HttpOAuthService
   * @private
   */
  private catchAuthError(self: HttpOAuthService) {
    let _self = self; // Just to use it

    // We have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      return Observable.throw(res);
    };
  }

  /**
   * Logout current user and go to login page.
   * @memberof HttpOAuthService
   * @private
   */
  private logout() {
    localStorage.clear();
    this.app.getRootNav().setRoot(LoginPage); // Check for future deprecation
  }
}
