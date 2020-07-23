import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from './registration.service';

@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(RegistrationPage),
  ],
  providers: [RegistrationService]
})
export class RegistrationPageModule {}
