import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { HomePage } from '../pages/home/home';

import { NewOrderPage } from '../pages/new-order/new-order';
import { InProcessPage } from '../pages/in-process/in-process';
import { DeliveredPage } from '../pages/delivered/delivered';

import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { DeliveredDetailPage } from '../pages/delivered-detail/delivered-detail';

import { AuthProvider } from '../providers/auth/auth';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NewOrderPage,
    InProcessPage,
    DeliveredPage,
    OrderDetailPage,
    DeliveredDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    }),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NewOrderPage,
    InProcessPage,
    DeliveredPage,
    OrderDetailPage,
    DeliveredDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CommonProvider
  ]
})
export class AppModule {}
