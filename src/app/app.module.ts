import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const firebase = {
  apiKey: "AIzaSyA2BVvIim73UWQj5z5lFRwMIGCShSk27Ho",
  authDomain: "resapp-1523718961807.firebaseapp.com",
  databaseURL: "https://resapp-1523718961807.firebaseio.com",
  projectId: "resapp-1523718961807",
  messagingSenderId: "872990739786"
}  

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
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { ConstantsProvider } from '../providers/constants/constants';
import { OrderProvider } from '../providers/order/order';

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
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    }),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    AuthProvider,
    CommonProvider,
    ConstantsProvider,
    OrderProvider
  ]
})
export class AppModule {}
