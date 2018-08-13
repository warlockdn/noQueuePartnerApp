import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsProvider } from '../constants/constants';

/*
  Generated class for the HotelsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotelsProvider {

  rooms: Array <{
    room: string,
    available: boolean
  }>

  bookings: Array<any>;

  constructor(public http: HttpClient) {
    console.log('Hello HotelsProvider Provider');
    
    this.getRooms().subscribe(
      data => {
        if (data["code"] === 200) {
          this.rooms = data["rooms"];
        } else {
          this.rooms = [];
        }
      }
    );

    this.getBookings().subscribe(
      data => {
        if (data["code"] === 200) {
          this.bookings = data["bookings"];
        }
      }
    )

  }

  getBookings() {
    return this.http.get(ConstantsProvider.bookings);
  }

  getRooms() {
    return this.http.get(ConstantsProvider.rooms);
  }

  findCustomer(phone) {
    return this.http.post(ConstantsProvider.findCustomer, {
      phone: phone
    })
  }

  checkIn(details) {
    return this.http.post(ConstantsProvider.checkIn, details);
  }

  checkout(customerID) {
    return this.http.post(ConstantsProvider.checkOut, {
      customerID: customerID
    })
  }

  registerCustomer(data) {
    return this.http.post(ConstantsProvider.registerCustomer, data);
  }

}
