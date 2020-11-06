import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductdetailPage } from './productdetail';
import { PopoverPage } from '../about-popover/about-popover';
import { ProductdetailPageRoutingModule } from './productdetail-routing.module';
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
    ProductdetailPageRoutingModule
  ],
  providers: [
    SettingService,
    ContactService,
    ProductService
    ],
  declarations: [ProductdetailPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [ProductdetailPage],
})
export class ProductdetailPageModule {}
