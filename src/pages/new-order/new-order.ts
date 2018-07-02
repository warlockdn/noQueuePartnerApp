import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, LoadingController, AlertController } from 'ionic-angular';

import { OrderDetailPage } from '../order-detail/order-detail';
import { OrderProvider } from '../../providers/order/order';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public orderProvider: OrderProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOrderPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  openOrderDetails(order) {
    const modal = this.modalCtrl.create(OrderDetailPage, {
      data: order,
      inProcess: false
      
    });
    modal.present();
  }

  accept(order) {

    const loader = this.loadingCtrl.create({
      content: "Accepting Order. Please Wait..."
    });

    loader.present();

    this.orderProvider.updateOrderStatus(order.docid, order.id, "ACCEPTED").subscribe(
      response => {
        loader.dismiss();
      }, err => {

      }
    )

  }

  decline(order) {

    const loader = this.loadingCtrl.create({
      content: "Declining Order. Please Wait..."
    });

    loader.present();

    this.orderProvider.updateOrderStatus(order.docid, order.id, "DECLINED").subscribe(
      response => {
        loader.dismiss();
      }, err => {

        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: "Error!",
          message: "Error declining order",
          buttons: ['OK']
        })

      }
    )

  }

}
