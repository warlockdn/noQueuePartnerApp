import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';

import { HotelsProvider } from '../../providers/hotels/hotels';
import { CheckinPage } from './checkin/checkin';
import { CustomerRegisterPage } from './customer-register/customer-register';

/**
 * Generated class for the ManageRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-rooms',
  templateUrl: 'manage-rooms.html',
})
export class ManageRoomsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, public hotelProvider: HotelsProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageRoomsPage');
  }

  refreshBookings(refresher) {
    this.hotelProvider.getBookings().subscribe(
      data => {
        if (data["code"] === 200) {
          this.hotelProvider.bookings = data["bookings"];
          refresher.complete();
        }
      }
    )
  }

  refreshBookingsIcon() {
    const loading = this.loadingCtrl.create({
      content: "Loading Bookings.."
    })
    loading.present();
    this.hotelProvider.getBookings().subscribe(
      data => {
        if (data["code"] === 200) {
          this.hotelProvider.bookings = data["bookings"];
          loading.dismiss();
        } else {
          loading.dismiss()
        }
      }, err => {
        loading.dismiss()
      }
    )
  }

  checkin() {

    const prompt = this.alertCtrl.create({
      title: "Enter phone number",
      message: "Please enter customer's phone number and proceed",
      inputs: [{
        name: "title",
        placeholder: "Phone Number" 
      }],
      buttons: [{
        text: "Cancel"
      }, {
        text: "Proceed",
        handler: data => {
          this.findCustomer(data.title);
        }
      }]
    })

    prompt.present();

  }

  filterRooms(ev) {

    let value = ev.target.value;
    if (value && value.trim() != '') {
      this.hotelProvider.bookings = this.hotelProvider.bookings.filter((item) => {
        return (item["room"].toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }

  }

  findCustomer(phone) {
    this.hotelProvider.findCustomer(phone).subscribe(
      (response: { result: boolean, customer: any }) => {
        if (response.result) { // customer found. Now checkin
          
          this.navCtrl.push(CheckinPage, {
            data: response.customer
          }, {
            animate: true,
            direction: "forward"
          })

        } else {

          this.navCtrl.push(CustomerRegisterPage, {
            data: phone
          }, {
            animate: true,
            direction: "forward"
          })

        }
      }
    )
  }

  checkout(customerID) {

    this.hotelProvider.checkout(customerID).subscribe(
      response => {
        if (response["code"] === 200) {
          const alert = this.alertCtrl.create({
            title: "Checked Out",
            message: "The customer has been successfully checked out",
            buttons: [{
              text: "OK",
              handler: () => {
                this.refreshBookingsIcon();
              }
            }]
          });
          alert.present();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error!",
            message: "Error while checking out customer",
            buttons: [{
              text: "OK",
              handler: () => {
                this.refreshBookingsIcon();
              }
            }]
          });
          alert.present();  
        }
      }, err => {
        const alert = this.alertCtrl.create({
          title: "Error!",
          message: "Error while checking out customer",
          buttons: [{
            text: "OK",
            handler: () => {
              this.refreshBookingsIcon();
            }
          }]
        });
        alert.present();
      }
    )
    
  }

  actions(customerID) {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Actions",
      buttons: [
        {
          text: "Checkout",
          handler: () => {
            console.log("Checking out customer...");
            this.checkout(customerID);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })

    actionSheet.present();
  }

}
