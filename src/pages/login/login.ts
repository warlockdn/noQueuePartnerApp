import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController, Events } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private ref: ChangeDetectorRef, public auth: AuthProvider, public toast: ToastController, public events: Events) {
    this.createLoginForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userID: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  login() {

    if (this.loginForm.valid) {

      this.auth.authenticate({
        username: this.loginForm.value.userID,
        password: this.loginForm.value.password
      }).subscribe(
        response => {
          
          this.auth.setUser(response.partner);
          this.navCtrl.setRoot(HomePage, {}, {
            animate: true,
            direction: "forward"
          })
          
        }, error => {

          const errToast = this.toast.create({
            message: 'Some error ocurred. Please try again later',
            duration: 5000,
            position: 'bottom'
          })

        }
      )

    }

  }

}
