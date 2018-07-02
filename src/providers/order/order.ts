import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';
import { ConstantsProvider } from '../constants/constants';

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
    this.getOrderPending();
    this.getOrderInProcess();
    this.getOrderDelivered();
  }

  getOrderPending() {

    let orderCollection:AngularFirestoreCollection<any> = this.af.collection("orders", ref => ref.where("partnerID", "==", this.auth.user.id).where("stage.accepted", "==", false).where("stage.declined", "==", false));

    this.pendingOrders = orderCollection.snapshotChanges().map(actions => {
      return actions.map(d => {
        const data = d.payload.doc.data();
        const docid = d.payload.doc.id;
        data.updatedOn = (new Date(data.updatedOn.seconds * 1000)).toLocaleString("en-us");
        console.log(data);
        return { docid, ...data }
      })
    });
  }

  getOrderInProcess() {

    let orderCollection:AngularFirestoreCollection<any> = this.af.collection("orders", ref => ref.where("partnerID", "==", this.auth.user.id).where("stage.accepted", "==", true).where("stage.declined", "==", false).where("stage.ready", "==", false));

    this.inProcessOrders = orderCollection.snapshotChanges().map(actions => {
      return actions.map(d => {
        const data = d.payload.doc.data();
        const docid = d.payload.doc.id;
        data.updatedOn = (new Date(data.updatedOn.seconds * 1000)).toLocaleString("en-us");
        console.log(data);
        return { docid, ...data }
      })
    });

  }

  getOrderDelivered() {

    let orderCollection:AngularFirestoreCollection<any> = this.af.collection("orders", ref => ref.where("partnerID", "==", this.auth.user.id).where("stage.ready", "==", true))

    this.deliveredOrders = orderCollection.snapshotChanges().map(actions => {
      return actions.map(d => {
        const data = d.payload.doc.data();
        const docid = d.payload.doc.id;
        data.updatedOn = (new Date(data.updatedOn.seconds * 1000)).toLocaleString("en-us");
        console.log(data);
        return { docid, ...data }
      })
    });
    
  }

  updateOrderStatus(tokenID, orderID, status) {
    return this.http.post(ConstantsProvider.order, {
      tokenID: tokenID,
      orderID: orderID,
      status: status
    })
  }

}
