import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

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

  lists: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  pendingOrders: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public orderProvider: OrderProvider) {
    // this.lists = this.lists.reverse();
    
    /* this.pendingOrders = this.orderProvider.getOrderPending();

    this.pendingOrders.toPromise().then((orders) => {
      this.orderProvider.pendingOrderCount = orders.length;
    }) */

    // this.items.forEach((item) => {
    //   console.log("Item:", item);
    // })
  }

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
      data: order
    });
    modal.present();
  }

}
