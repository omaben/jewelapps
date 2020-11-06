import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CollectionService } from '../../services/collection.service';
import { BrandService } from '../../services/brand.service';
import { SettingService } from '../../services/setting.service';
import { CommentService } from '../../services/comment.service';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HttpModule } from '@angular/http';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers: [
  ProductService,
  CollectionService,
  BrandService,
  SettingService,
  CommentService
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
