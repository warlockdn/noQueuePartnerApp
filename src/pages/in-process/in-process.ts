import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { OrderDetailPage } from '../order-detail/order-detail';

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

  lists: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public common: CommonProvider) {
    this.lists = this.lists.reverse()
  }

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

  openOrderDetails() {
    const orderDetails = { inProcess: true, delivered: false };
    const modal = this.modalCtrl.create(OrderDetailPage, orderDetails);
    modal.present();
  }

}
