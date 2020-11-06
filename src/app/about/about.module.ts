import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutPage } from './about';
import { PopoverPage } from '../about-popover/about-popover';
import { AboutPageRoutingModule } from './about-routing.module';
import { SettingService } from '../../services/setting.service';
import { HttpModule } from '@angular/http';
import { ContactService } from '../../services/contact.service';
import {RouterModule} from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    AboutPageRoutingModule
  ],
  providers: [
    SettingService,
    ContactService,
    
    ],
  declarations: [AboutPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [AboutPage],
})
export class AboutPageModule {}
