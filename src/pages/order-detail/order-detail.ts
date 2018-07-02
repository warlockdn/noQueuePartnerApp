import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  order: any;
  inProcess: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public orderProvider: OrderProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    this.order = navParams.get("data");
    this.inProcess = navParams.get("inProcess");

    console.log(this.order);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  accept() {

    const loader = this.loadingCtrl.create({
      content: "Accepting Order. Please Wait..."
    });

    loader.present();

    this.orderProvider.updateOrderStatus(this.order.docid, this.order.id, "ACCEPTED").subscribe(
      response => {
        loader.dismiss();
        this.viewCtrl.dismiss();
      }, err => {

      }
    )

  }

  decline() {

    const loader = this.loadingCtrl.create({
      content: "Declining Order. Please Wait..."
    });

    loader.present();

    this.orderProvider.updateOrderStatus(this.order.docid, this.order.id, "DECLINED").subscribe(
      response => {
        loader.dismiss();
        this.viewCtrl.dismiss();
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

  ready() {
    
    const loader = this.loadingCtrl.create({
      content: "Processing request. Please wait..."
    });

    loader.present();

    this.orderProvider.updateOrderStatus(this.order.docid, this.order.id, "READY").subscribe(
      response => {
        loader.dismiss();
        this.viewCtrl.dismiss();
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
