import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {

  details: any;

  constructor(public navCtrl: NavController, private homeService: HomeService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.fetchProfile();
  }

  fetchProfile() {
    this.homeService.fetchProfileData().subscribe((res: any) => {
      console.log(res);
      this.details = res.data.userData;
    })
  }

}
