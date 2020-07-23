import { NgModule } from '@angular/core';
import { InterceptorService, Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { App } from 'ionic-angular';

import { HttpOAuthService } from './http-auth.service';

export function httpFactory(http: Http, backend: XHRBackend, options: RequestOptions, app: App) {
  return new HttpOAuthService(http, backend, options, app);
}

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        {
          provide: HttpOAuthService,
          useFactory: httpFactory,
          deps: [Http, XHRBackend, RequestOptions]
        },
    ],
})
export class AuthModule { }
