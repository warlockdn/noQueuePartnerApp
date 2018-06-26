import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../auth/auth';

export interface Order {
  id?: number
}

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  orderCollection: AngularFirestoreCollection<any>;
  pendingOrders: Observable<Order[]>;
  inProcessOrders: Observable<Order[]>;
  deliveredOrders: Observable<Order[]>;

  constructor(public http: HttpClient, public af: AngularFirestore, public auth: AuthProvider) {
    console.log('Hello OrderProvider Provider');
    this.orderCollection = this.af.collection("prders");
    this.getOrderPending();
    this.getOrderInProcess();
    this.getOrderDelivered();
  }

  getOrderPending() {
    this.pendingOrders = this.af.collection("orders", ref => ref.where("partnerID", "==", this.auth.user.id).where("stage.accepted", "==", false)).valueChanges();
  }

  getOrderInProcess() {
    this.inProcessOrders = this.af.collection("orders", ref => ref.where("partnerID", "==", this.auth.user.id).where("stage.accepted", "==", true)).valueChanges();
  }

  getOrderDelivered() {
    this.deliveredOrders = this.af.collection("orders", ref => ref.where("partnerID", "==", this.auth.user.id).where("stage.delivered", "==", true)).valueChanges();
  }

}
