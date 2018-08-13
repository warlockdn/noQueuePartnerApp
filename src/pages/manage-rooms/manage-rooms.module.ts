import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageRoomsPage } from './manage-rooms';

@NgModule({
  declarations: [
    ManageRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageRoomsPage),
  ],
})
export class ManageRoomsPageModule {}
