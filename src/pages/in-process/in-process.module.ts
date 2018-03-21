import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InProcessPage } from './in-process';

@NgModule({
  declarations: [
    InProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(InProcessPage),
  ],
})
export class InProcessPageModule {}
