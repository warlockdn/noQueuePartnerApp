import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, LoadingController, AlertController } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { OrderDetailPage } from '../order-detail/order-detail';

import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the InProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-in-process',
  templateUrl: 'in-process.html',
})
export class InProcessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public common: CommonProvider, public orderProvider: OrderProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InProcessPage');
  }

  openOrderDetails(order) {
    const modal = this.modalCtrl.create(OrderDetailPage, {
      data: order,
      inProcess: true
    });
    modal.present();
  }

  ready(order) {

    const loader = this.loadingCtrl.create({
      content: "Processing request. Please wait..."
    });

    loader.present();

    this.orderProvider.updateOrderStatus(order.docid, order.id, "READY").subscribe(
      response => {
        loader.dismiss();
      }, err => {

        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: "Error!",
          message: "Error notifying customer",
          buttons: ['OK']
        })

      }
    )

  }

}
