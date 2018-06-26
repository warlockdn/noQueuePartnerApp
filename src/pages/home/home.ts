import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewOrderPage } from '../new-order/new-order';
import { InProcessPage } from '../in-process/in-process';
import { DeliveredPage } from '../delivered/delivered';

import { CommonProvider } from '../../providers/common/common';
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

  constructor(public navCtrl: NavController, public common: CommonProvider, public orderProvider: OrderProvider) {
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

}
