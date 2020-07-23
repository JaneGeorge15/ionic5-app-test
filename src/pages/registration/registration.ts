import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationService } from './registration.service';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [RegistrationService]
})
export class RegistrationPage {

  details: any = {};

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private registrationService: RegistrationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  onSubmit(form: any) {
    if (form.valid) {
      const data = this.details;
      delete data.confirmPassword;
      this.presentLoading();
      this.registrationService.registration(data).subscribe((res: any) => {
        this.navCtrl.setRoot(LoginPage);
      }, error => {
        console.log('error', error);
      })
    }
  }

}
