import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeService } from './home.service';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers: [HomeService]
})
export class HomePageModule {}
