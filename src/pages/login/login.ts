import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginService } from './login.service';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  details : any = {};

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private loginService : LoginService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  goToRegister() {
    this.navCtrl.setRoot(RegistrationPage);
  }

  onSubmit(form: any) {
    if (form.valid) {
      const data = this.details;
      this.presentLoading();
      this.loginService.login(data).subscribe((res: any) => {       
        if (res.success) {
          this.navCtrl.setRoot(HomePage);
        } else {
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: res.message,
            buttons: ['OK']
          });
          alert.present();
        }
      }, error => {
        console.log('error', error);
      })
    }
  }

}
