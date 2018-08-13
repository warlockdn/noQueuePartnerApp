import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerRegisterPage } from './customer-register';

@NgModule({
  declarations: [
    CustomerRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerRegisterPage),
  ],
})
export class CustomerRegisterPageModule {}
