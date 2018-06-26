import { Component } from '@angular/core';
import { Platform, Menu, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  isLoggedIn: boolean = false;
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public events: Events,
    private storage: Storage, 
    private auth: AuthProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.listenToLoginEvents();
    this.storage.get("user").then(
      (user) => {
        if (user) {
          this.rootPage = HomePage;
          this.events.publish("user:login");
        } else {
          this.rootPage = LoginPage;
          this.events.publish("user:logout");
        }
      }
    )

    this.auth.loggedInStatus().then(
      (status) => {
        if (status) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      } 
    )

  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.isLoggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.isLoggedIn = false;
    });
  }


}

