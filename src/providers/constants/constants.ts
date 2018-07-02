import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {

  // public static auth = "http://localhost:3003/p1/auth/login";
  // public static order = "http://localhost:3003/p1/orders";

  public static auth = "http://192.168.31.190:3003/p1/auth/login";
  public static order = "http://192.168.31.190:3003/p1/orders";

  public token = null;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello ConstantsProvider Provider');
    this.getToken().then((token) => {
      if (token) {
        this.token = token;
      }
    })
  }

  getToken() {
    return this.storage.get("token").then((token) => {
      return token;
    }).catch((err) => {
      return err;
    })
  }

  setToken(token) {
    console.log('Setting Token ', token);
    this.storage.set("token", token);
    this.token = token;
  }

}
