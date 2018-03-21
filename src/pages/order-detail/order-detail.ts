import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

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

  inProcess: boolean = false;
  delivered: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    
    this.inProcess = navParams.get('inProcess');
    this.delivered = navParams.get('delivered');

    console.log(this.delivered);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
