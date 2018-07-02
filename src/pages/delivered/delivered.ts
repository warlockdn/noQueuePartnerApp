import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { DeliveredDetailPage } from '../delivered-detail/delivered-detail';

import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the DeliveredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivered',
  templateUrl: 'delivered.html',
})
export class DeliveredPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public common: CommonProvider, public orderProvider: OrderProvider) {
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveredPage');
  }

  openOrderDetails(order) {
    const modal = this.modalCtrl.create(DeliveredDetailPage, {
      data: order
    });
    modal.present();
  }

}
