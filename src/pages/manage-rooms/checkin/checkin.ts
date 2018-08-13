import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HotelsProvider } from '../../../providers/hotels/hotels';
import { HomePage } from '../../home/home';

/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  customer: {
    name: string,
    customerID: number,
    phone: number
  };

  public details = {
    startdate: '',
    enddate: '',
    room: ''
  };

  minDate: string;
  rooms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public hotelProvider: HotelsProvider, public alertCtrl: AlertController) {
    this.customer = this.navParams.get('data');
    console.log(this.customer);

    this.details.startdate = (new Date()).toISOString();
    this.minDate = new Date((new Date()).setDate((new Date()).getDate() + 1)).toISOString()

    console.log(this.minDate)

    let rooms = [];
    this.hotelProvider.rooms.forEach((room)=> {
      if (room.available) {
        rooms.push(room);
      }
    })

    this.rooms = rooms;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  confirmAlert() {
    const alert = this.alertCtrl.create({
      title: "Check-In Successfull",
      message: "Customer has been successfully checked in.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    })
    alert.present();
  }

  checkin() {
    this.hotelProvider.checkIn({
      customerID: this.customer.customerID,
      enddate: this.details.enddate,
      room: this.details.room 
    }).subscribe(
      response => {
        if (response["code"] === 200) {
          this.confirmAlert();
        } else {
          let alertErr = this.alertCtrl.create({
            title: "Error!",
            message: "There seems to be a error while checking in. Please inform support."
          })
          alertErr.present();
        }
      }, err => {
        console.log(err);
      }
    )
  }

}
