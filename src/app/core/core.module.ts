import { NgModule } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    HttpModule,
    AuthModule,
  ],
  exports: [
    AuthModule
  ],
  declarations: [],
  providers: [
    SplashScreen
  ]
})
export class CoreModule { }
