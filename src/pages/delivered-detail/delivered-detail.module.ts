import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveredDetailPage } from './delivered-detail';

@NgModule({
  declarations: [
    DeliveredDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveredDetailPage),
  ],
})
export class DeliveredDetailPageModule {}
