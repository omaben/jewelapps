import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './success-routing.module';

import { SuccessComponent } from './success.page';
import { ProductService } from '../../services/product.service';
import { SettingService } from '../../services/setting.service';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CartPageRoutingModule
  ],
  providers: [
    SettingService,
    ProductService,
    AccountService,
    CartService,
    OrderService
    ],
  declarations: [SuccessComponent]
})
export class SuccessPageModule {}
