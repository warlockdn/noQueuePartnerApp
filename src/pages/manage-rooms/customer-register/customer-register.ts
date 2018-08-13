import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CheckinPage } from '../checkin/checkin';

import { HotelsProvider } from '../../../providers/hotels/hotels';

/**
 * Generated class for the CustomerRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-register',
  templateUrl: 'customer-register.html',
})
export class CustomerRegisterPage {

  registerForm: FormGroup;
  phone: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public toast: ToastController, public hotelProvider: HotelsProvider) {
    this.phone = this.navParams.get("data");
    this.createRegisterForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerRegisterPage');
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      phone: new FormControl(this.phone, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl(null, [Validators.email]),
      name: new FormControl(null, Validators.required)
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.hotelProvider.registerCustomer(this.registerForm.value)
        .subscribe(response => {
          this.navCtrl.push(CheckinPage, {
            data: response["customer"]
          }, {
            animate: true,
            direction: "forward",
            keyboardClose: true
          })

        }, err => {

        })
    }
  }


}
