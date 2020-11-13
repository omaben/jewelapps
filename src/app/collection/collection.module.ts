import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectionPage } from './collection';
import { PopoverPage } from '../about-popover/about-popover';
import { CollectionPageRoutingModule } from './collection-routing.module';
import { SettingService } from '../../services/setting.service';
import { HttpModule } from '@angular/http';
import { ContactService } from '../../services/contact.service';
import {RouterModule} from '@angular/router';
import { ProductService } from '../../services/product.service';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    CollectionPageRoutingModule
  ],
  providers: [
    SettingService,
    ContactService,
    ProductService
    ],
  declarations: [CollectionPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [CollectionPage],
})
export class CollectionPageModule {}
