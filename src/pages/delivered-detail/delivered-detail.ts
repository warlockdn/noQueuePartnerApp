import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the DeliveredDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivered-detail',
  templateUrl: 'delivered-detail.html',
})
export class DeliveredDetailPage {

  order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.order = navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveredDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
