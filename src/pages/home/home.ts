import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';

import { NewOrderPage } from '../new-order/new-order';
import { InProcessPage } from '../in-process/in-process';
import { DeliveredPage } from '../delivered/delivered';

import { ManageRoomsPage } from '../manage-rooms/manage-rooms';

import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  page1: any = NewOrderPage;
  page2: any = InProcessPage;
  page3: any = DeliveredPage;

  constructor(public navCtrl: NavController, public common: CommonProvider, public orderProvider: OrderProvider, public authProvider: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

  logout() {

    const alert = this.alertCtrl.create({
      title: "Are you sure?",
      subTitle: "Are you sure you want to logout?",
      buttons: [
        {
          text: "Cancel"
        }, {
          text: "Logout",
          handler: () => {

            const loader = this.loadingCtrl.create({
              content: "Logging out. Please wait..."
            })

            loader.present();
        
            this.authProvider.logout().then(
              success => {
                loader.dismiss();
                this.navCtrl.setRoot(LoginPage);
              }
            )

          }
        }
      ]
    })

    alert.present();

  }

  manageRooms() {

    this.navCtrl.push(ManageRoomsPage, {}, {
      animate: true,
      direction: "forward"
    });
  }

}
